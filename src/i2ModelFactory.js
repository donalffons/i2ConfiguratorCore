"use strict";

import i2DatabaseDefault from "./i2Database.js";
import i2Model from "./i2Model.js";

export default class i2ModelFactory {
    static createNewModel(cb) {
        i2DatabaseDefault.createNewModelID({success: function(id) {
            let newModel = new i2Model();
            newModel.setID(id);
            if(cb !== undefined) { cb(newModel); }
        }});
    }
}
