"use strict";

class i2Value {
    constructor(object) {
        this.valueString = "";
        if(object !== undefined) {
            this.setValue(object);
        }
    }
    setValue(object) { this.valueString = JSON.stringify(object); }
    getValue() { return JSON.parse(this.valueString); }

    setValueString(str) { this.valueString = str; }
    getValueString() { return this.valueString; }
}
