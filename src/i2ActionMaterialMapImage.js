"use strict";

class i2ActionMaterialMapImage extends i2Action {
    constructor() {
        super();
        this.setType("i2ActionMaterialMapImage");
        this.materialSelector = null;
        this.property = null;
        this.value = null;
        this.baseDir = null;
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

    setBaseDir(dir) { this.baseDir = decodeURI(dir); }
    getBaseDir() { return this.baseDir; }

    initialize(data) {
        if(data && data.materialSelector) {
            this.setMaterialSelector(data.materialSelector);
        }
        if(data && data.property) {
            this.setProperty(data.property);
        }
        if(data && data.baseDir) {
            this.setBaseDir(data.baseDir);
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
                material.userData.overrides[this.getProperty()].default = material.map != null ? decodeURI(material.map.image.src).substr(this.baseDir.length) : null;
            }
        }
    }
    execute() {
        let material = this.materialSelector.getMaterial();
        let value = this.getValue().getValueData();
        if(this.getProperty() == "mapImage") {
            if(value != null) {
                var loader = new THREE.TextureLoader();
                loader.load(this.baseDir+value, ( texture ) => {
                        if(material.map == null) {
                            material.map = texture;
                        } else {
                            material.map.image = texture.image;
                        }
                        material.map.needsUpdate = true;
                        material.needsUpdate = true;
                    },
                    // onProgress callback currently not supported
                    undefined,
                    // onError callback
                    function ( err ) { console.error( 'An error happened.' ); }
                );
            } else {
                material.map = null;
            }
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
            if(typeof defaultValue == "string") {
                material[this.getProperty()] = new THREE.Color(defaultValue);
            } else {
                material[this.getProperty()] = new THREE.Color(defaultValue.r, defaultValue.g, defaultValue.b);
            }
        } else if(this.getProperty() == "mapImage") {
            if(defaultValue != null) {
                var loader = new THREE.TextureLoader();
                loader.load(this.baseDir+defaultValue, ( texture ) => {
                        if(material.map == null) {
                            material.map = texture;
                        } else {
                            material.map.image = texture.image;
                        }
                        material.map.needsUpdate = true;
                        material.needsUpdate = true;
                    },
                    // onProgress callback currently not supported
                    undefined,
                    // onError callback
                    function ( err ) { console.error( 'An error happened.' ); }
                );
            } else {
                material.map = null;
            }
        } else {
            Object.assign(material[this.getProperty()], defaultValue);
        }

        material.needsUpdate = true;
        material.userData.overrides[this.getProperty()].overridden = false;
    }
}
