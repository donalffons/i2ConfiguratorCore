"use strict";

class i2ModelBuilder {
    static createNewModel() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.createNewModelID({success: function(id) {
                let newModel = new i2Model();
                newModel.setID(id);
                resolve(newModel);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getModelByID(id) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getModelByID(id, {success: function(data) {
                if(data.length == 0) {
                    reject();
                }
                let newModel = new i2Model();
                newModel.setData(data);
                resolve(newModel);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getModelByPath(path) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getModelByPath(path, {success: function(data) {
                if(data.length == 0) {
                    reject();
                }
                let newModel = new i2Model();
                newModel.setData(data);
                resolve(newModel);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getModelsByName(name) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getModelsByName(name, {success: function(data) {
                if(data.length == 0) {
                    reject();
                }
                let newModels = [];
                for(let i = 0; i < data.length; ++i) {
                    newModels[i] = new i2Model();
                    newModels[i].setData(data[i]);
                }
                resolve(newModels);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }
}
