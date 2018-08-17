"use strict";

class i2ActionObjectProperty extends i2Action {
    constructor() {
        super();
        setType("i2ActionObjectProperty");
        delete this.data.action;
        this.objectsSelector = null;
        this.property = null;
        this.value = null;
    }
    
    setObjectsSelector(sel) { this.objectsSelector = sel; }
    getObjectsSelector() { return this.objectsSelector; }

    setProperty(prop) { this.property = prop; }
    getProperty() { return this.property; }

    setValue(value) { this.value = value; }
    getValue() { return this.value; }

    getAction() {
        return JSON.stringify({
            objectSelector: this.objectsSelector,
            property: this.property,
            value: this.value
        })
    }
    setAction() { console.error("Cannot call setAction!"); }
}
