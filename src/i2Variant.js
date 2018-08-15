"use strict";

import i2DatabaseObject from "./i2DatabaseObject.js";
import i2DatabaseDefault from "./i2Database.js";
import i2ActionBuilder from "./i2ActionBuilder.js";

export default class i2Variant extends i2DatabaseObject{
    constructor(executor) {
        super(executor);
        this.data = {};
        this.data.id = null;
        this.data.name = null;
        this.data.idmodel = [];
    }
    setID(id) { this.data.id = id; }
    getID() { return this.data.id; }

    setName(name) { this.data.name = name; }
    getName() {return this.data.name; }

    setModelIDs(ids){ this.data.idmodel = ids; }
    getModelIDs(){ return this.data.idmodel; }

    async save() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.saveVariant(this.data, {success: (data) => {
                this.data = data;
                resolve();
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    async delete() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.deleteVariantByID(this.data.id, {success: () => {
                delete this.data;
                resolve();
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    getActions() { return i2ActionBuilder.getActionsByVariantID(this.data.id); }
}
