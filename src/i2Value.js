"use strict";

class i2Value {
    constructor(object) {
        this.valueData = null;
        if(object !== undefined) {
            this.setValueData(object);
        }
    }
    setValueData(data) { this.valueData = data; }
    getValueData() { return this.valueData; }
}
