"use strict";

class i2Value {
    constructor() {
        this.valueString = "";
    }
    setValue(Object) { this.valueString = JSON.stringify(Object); }
    getValue() { return JSON.parse(this.valueString); }

    setValueString(str) { this.valueString = str; }
    getValueString() { return this.valueString; }
}
