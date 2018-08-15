"use strict";

import i2DatabaseObject from "./i2DatabaseObject.js";
import i2DatabaseDefault from "./i2Database.js";

export default class i2Action extends i2DatabaseObject{
    constructor(executor) {
        super(executor);
        this.data = {};
        this.data.id = null;
        this.data.name = null;
        this.data.idvariant = [];
        this.data.type = null;
        this.data.action = null;
    }
    setID(id) { this.data.id = id; }
    getID() { return this.data.id; }

    setName(name) { this.data.name = name; }
    getName() {return this.data.name; }

    setType(type) { this.data.type = type; }
    getType() {return this.data.type; }

    setAction(action) { this.data.action = action; }
    getAction() {return this.data.action; }

    setVariantIDs(ids){ this.data.idvariant = ids; }
    getVariantIDs(){ return this.data.idvariant; }

    async save() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.saveAction(this.data, {success: (data) => {
                this.data = data;
                resolve();
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    async delete() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.deleteActionByID(this.data.id, {success: () => {
                delete this.data;
                resolve();
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }
}


