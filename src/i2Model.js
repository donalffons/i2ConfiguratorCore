"use strict";

import i2DatabaseObject from "./i2DatabaseObject.js";
import i2DatabaseDefault from "./i2Database.js";

export default class i2Model extends i2DatabaseObject {
    constructor(name) {
        super();
        this.data = {};
        this.data.name = (name === undefined) ? "" : name;
        i2DatabaseDefault.createNewModelID({success: (id) => {
            this.data.id = id;
            i2DatabaseDefault.saveModel(this, (model) => {this.data = model.data});
        }});
    }
}
