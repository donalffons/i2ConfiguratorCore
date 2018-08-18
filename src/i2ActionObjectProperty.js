"use strict";

class i2ActionObjectProperty extends i2Action {
    constructor() {
        super();
        this.setType("i2ActionObjectProperty");
        this.objectsSelector = null;
        this.property = null;
        this.value = null;
    }

    updateAction() {
        this.data.action = JSON.stringify({
            objectsSelector: this.objectsSelector.getSelectorString(),
            property: this.property,
            value: this.value != null ? this.value.getValueString() : null
        });
    }
    
    setObjectsSelector(sel) { this.objectsSelector = sel; this.updateAction(); }
    getObjectsSelector() { return this.objectsSelector; }

    setProperty(prop) { this.property = prop; this.updateAction(); }
    getProperty() { return this.property; }

    setValue(value) { this.value = value; this.updateAction(); }
    getValue() { return this.value; }
}
