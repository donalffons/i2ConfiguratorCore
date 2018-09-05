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

    execute() {
        let material = this.materialSelector.getMaterial();
        let value = this.value.getValueData();
        if(this.property == "color") {
            eval("material."+this.property+" = new THREE.Color(value)");
        } else {
            eval("material."+this.property+".copy(value)");
        }
    }
}
