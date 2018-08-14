"use strict";

import i2DatabaseObject from "./i2DatabaseObject.js";
import i2DatabaseDefault from "./i2Database.js";

export default class i2Model extends i2DatabaseObject {
    constructor() {
        super();
        this.data = {};
        this.data.id = null;
        this.data.name = null
    }
    setID(id) { this.data.id = id; }
    getID() { return this.data.id; }

    setName(name) { this.data.name = name;}
    getName() {return this.data.name; }

    save(cb) {
        i2DatabaseDefault.saveModel(this.data, {success: (data) => {
            this.data = data;
            if(cb !== undefined) { cb(); }
        }});
    }
    delete(cb) {
        i2DatabaseDefault.deleteModelByID(this.data.id, {success: () => {
            delete this.data;
            if(cb !== undefined) { cb(); }
        }});
    }
    
}
