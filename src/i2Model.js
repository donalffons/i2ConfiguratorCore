"use strict";

import i2DatabaseObject from "./i2DatabaseObject.js";
import i2DatabaseDefault from "./i2Database.js";
import i2VariantBuilder from "./i2VariantBuilder.js";

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

    getPath() {return this.data.path; }

    async save() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.saveModel(this.data, {success: (data) => {
                this.data = data;
                resolve();
            }});
        });
        return promise;
    }
    async delete() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.deleteModelByID(this.data.id, {success: () => {
                delete this.data;
                resolve();
            }});
        });
    }

    async get3DFiles() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.get3DFilesByModelID(this.data.id, {success: (data) => {
                resolve(data);                
            }});
        });
        return promise;
    }

    getVariants() { return i2VariantBuilder.getVariantsByModelID(this.data.id); }
}
