"use strict";

class i2VariantBuilder {
    static createNewVariant() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.createNewVariantID({success: function(id) {
                let newVariant = new i2Variant();
                newVariant.setID(id);
                resolve(newVariant);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getVariantsByModelID(id) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getVariantsByModelID(id, {success: function(data) {
                if(data.length == 0) {
                    resolve();
                    return;
                }
                let variants = [];
                for(let i = 0; i < data.length; i++) {
                    variants[i] = new i2Variant();
                    variants[i].setData(data[i]);
                }
                resolve(variants);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getVariantsByName(name) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getVariantsByName(name, {success: function(data) {
                if(data.length == 0) {
                    resolve();
                    return;
                }
                let variants = [];
                for(let i = 0; i < data.length; i++) {
                    variants[i] = new i2Variant();
                    variants[i].setData(data[i]);
                }
                resolve(variants);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getVariantByID(id) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getVariantByID(id, {success: function(data) {
                if(data.length == 0) {
                    resolve();
                    return;
                }
                let variant = new i2Variant();
                variant.setData(data);
                resolve(variant);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }
}
