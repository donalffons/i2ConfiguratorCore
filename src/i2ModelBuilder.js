"use strict";

import i2DatabaseDefault from "./i2Database.js";
import i2Model from "./i2Model.js";

export default class i2ModelBuilder {
    static async createNewModel() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.createNewModelID({success: function(id) {
                let newModel = new i2Model();
                newModel.setID(id);
                resolve(newModel);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static async getModelByID(id) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getModelByID(id, {success: function(data) {
                let newModel = new i2Model();
                newModel.data = data;
                resolve(newModel);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static async getModelByByPath(path) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getModelByPath(path, {success: function(data) {
                let newModel = new i2Model();
                newModel.data = data;
                resolve(newModel);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static async getModelsByName(name) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getModelsByName(name, {success: function(data) {
                let newModels = [];
                for(let i = 0; i < data.length; ++i) {
                    newModels[i] = new i2Model();
                    newModels[i].data = data;
                }
                resolve(newModels);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }
}
