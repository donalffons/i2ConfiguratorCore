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

    execute() {
        let objects = this.objectsSelector.getObjects();
        objects.forEach((object) => {
            let value = this.value.getValueData();
            eval("object."+this.property+".copy(value)");
        });
    }
}
