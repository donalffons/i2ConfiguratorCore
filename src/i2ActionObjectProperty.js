"use strict";

class i2ActionObjectProperty extends i2Action {
    constructor() {
        super();
        this.setType("i2ActionObjectProperty");
        this.objectsSelector = null;
        this.property = null;
        this.value = null;
    }

    setData(data) {
        super.setData(data);
        let actionData = JSON.parse(data.action);
        this.objectsSelector = new i2ObjectsHierarchySelector(null);
        this.objectsSelector.setSelectorData(actionData.objectsSelector);
        this.property = actionData.property;
        this.value = new i2Value();
        this.value.setValueData(actionData.value);
    }

    getData() {
        this.data.action = JSON.stringify({
            objectsSelector: this.objectsSelector.getSelectorData(),
            property: this.property,
            value: this.value != null ? this.value.getValueData() : null
        });
        return super.getData();
    }
    
    setObjectsSelector(sel) { this.objectsSelector = sel; }
    getObjectsSelector() { return this.objectsSelector; }

    setProperty(prop) { this.property = prop; }
    getProperty() { return this.property; }

    setValue(value) { this.value = value; }
    getValue() { return this.value; }

    initialize(data) {
        if(data && data.objectsSelector) {
            this.setObjectsSelector(data.objectsSelector);
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

        let objects = this.getObjectsSelector().getObjects();
        objects.forEach((o) => {
            if(o.userData.overrides === undefined) {
                o.userData.overrides = {};
            }
            if(o.userData.overrides[this.getProperty()] !== undefined) {
                console.error("another override for this property already exists!");
            }
            o.userData.overrides[this.getProperty()] = {};
            o.userData.overrides[this.getProperty()].overridden = false;
            o.userData.overrides[this.getProperty()].default = (data && data.default) ? data.default : Object.assign({}, o[this.getProperty()]); // shallow clone
        });
    }
    execute() {
        let objects = this.objectsSelector.getObjects();
        objects.forEach((object) => {
            let value = this.value.getValueData();
            eval("object."+this.property+".copy(value)");
            object.userData.overrides[this.getProperty()].overridden = true;
        });
    }
    revert() {
        let objects = this.objectsSelector.getObjects();
        objects.forEach((object) => {
            let value = object.userData.overrides[this.getProperty()].default;
            eval("object."+this.property+".copy(value)");
            object.userData.overrides[this.getProperty()].overridden = false;
        });
    }
}
