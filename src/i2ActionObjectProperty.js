"use strict";

class i2ActionObjectProperty extends i2Action {
    constructor() {
        super();
        setType("i2ActionObjectProperty");
        this.objectsSelector = null;
        this.property = null;
        this.value = null;
    }

    updateAction() {
        this.data.action = JSON.stringify({
            objectSelector: this.objectsSelector,
            property: this.property,
            value: this.value
        });
    }
    
    setObjectsSelector(sel) { this.objectsSelector = sel; updateAction(); }
    getObjectsSelector() { return this.objectsSelector; }

    setProperty(prop) { this.property = prop; updateAction(); }
    getProperty() { return this.property; }

    setValue(value) { this.value = value; updateAction(); }
    getValue() { return this.value; }
}
