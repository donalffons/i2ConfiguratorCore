"use strict";

class i2ActionMaterialProperty extends i2Action {
    constructor() {
        super();
        this.setType("i2ActionMaterialProperty");
        this.materialSelector = null;
        this.property = null;
        this.value = null;
    }

    setData(data) {
        super.setData(data);
        let actionData = JSON.parse(data.action);
        if(this.materialSelector === undefined || this.materialSelector === null) {
            this.materialSelector = new i2MaterialNameSelector(null);
        }
        this.materialSelector.setSelectorData(actionData.materialSelector);
        this.property = actionData.property;
        this.value = new i2Value();
        this.value.setValueData(actionData.value);
    }

    getData() {
        this.data.action = JSON.stringify({
            materialSelector: this.materialSelector.getSelectorData(),
            property: this.property,
            value: this.value != null ? this.value.getValueData() : null
        });
        return super.getData();
    }
    
    setMaterialSelector(sel) { this.materialSelector = sel; }
    getMaterialSelector() { return this.materialSelector; }

    setProperty(prop) { this.property = prop; }
    getProperty() { return this.property; }

    setValue(value) { this.value = value; }
    getValue() { return this.value; }

    initialize(data) {
        if(data && data.materialSelector) {
            this.setMaterialSelector(data.materialSelector);
        }
        if(data && data.property) {
            this.setProperty(data.property);
        }
        if(data && data.value) {
            this.setValue(data.value);
        }
        if(data && data.tags) {
            this.setTags(data.tags);
        }

        let material = this.materialSelector.getMaterial();
        if(material.userData.overrides === undefined) {
            material.userData.overrides = {};
        }
        if(material.userData.overrides[this.getProperty()] !== undefined) {
            console.error("another override for this property already exists!");
            return;
        }
        material.userData.overrides[this.getProperty()] = {};
        material.userData.overrides[this.getProperty()].overridden = false;

        if(data && data.default) {
            material.userData.overrides[this.getProperty()].default = data.default;
        } else {
            if(this.getProperty() == "mapImage") {
                material.userData.overrides[this.getProperty()].default = material.map.image.src;
            } else {
                material.userData.overrides[this.getProperty()].default = Object.assign({}, material[this.getProperty()]); // shallow clone
            }
        }
    }
    execute() {
        let material = this.materialSelector.getMaterial();
        let value = this.value.getValueData();
        if(this.getProperty() == "color") {
            material[this.getProperty()] = new THREE.Color(value.r, value.g, value.b);
        } else if(this.getProperty() == "mapImage") {
            var loader = new THREE.TextureLoader();
            loader.load(value, ( texture ) => {
                    material.map.image = texture.image;
                    material.map.needsUpdate = true;
                },
                // onProgress callback currently not supported
                undefined,
                // onError callback
                function ( err ) { console.error( 'An error happened.' ); }
            );
        } else {
             Object.assign(material[this.getProperty()], value);
        }

        material.needsUpdate = true;
        material.userData.overrides[this.getProperty()].overridden = true;
    }
    revert() {
        let material = this.materialSelector.getMaterial();
        let defaultValue = material.userData.overrides[this.getProperty()].default;
        if(this.getProperty() == "color") {
            material[this.getProperty()] = new THREE.Color(defaultValue.r, defaultValue.g, defaultValue.b);
        } else if(this.getProperty() == "mapImage") {
            var loader = new THREE.TextureLoader();
            loader.load(defaultValue, ( texture ) => {
                    material.map.image = texture.image;
                    material.map.needsUpdate = true;
                },
                // onProgress callback currently not supported
                undefined,
                // onError callback
                function ( err ) { console.error( 'An error happened.' ); }
            );
        } else {
            Object.assign(material[this.getProperty()], defaultValue);
        }

        material.needsUpdate = true;
        material.userData.overrides[this.getProperty()].overridden = false;
    }
}
