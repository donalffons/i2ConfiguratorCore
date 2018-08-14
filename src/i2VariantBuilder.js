"use strict";

import i2DatabaseDefault from "./i2Database.js";
import i2Variant from "./i2Variant.js";

export default class i2VariantBuilder {
    static createNewVariant(cb) {
        i2DatabaseDefault.createNewVariantID({success: function(id) {
            let newVariant = new i2Variant();
            newVariant.setID(id);
            if(cb !== undefined) { cb(newVariant); }
        }});
    }

    static getVariantsByModelID(id, cb) {
        i2DatabaseDefault.getVariantsByModelID(id, {success: function(data) {
            let variants = [];
            for(let i = 0; i < data.length; i++) {
                variants[i] = new i2Variant();
                variants[i].data = data[i];
            }
            if(cb !== undefined) { cb(variants); }
        }})
    }

    static getVariantByID(id, cb) {
        i2DatabaseDefault.getVariantByID(id, {success: function(data) {
            let variant = new i2Variant();
            variant.data = data;
            if(cb !== undefined) { cb(variant); }
        }})
    }
}
