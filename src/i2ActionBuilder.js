"use strict";

import i2DatabaseDefault from "./i2Database.js";
import i2Action from "./i2Action.js";

export default class i2ActionBuilder {
    static createNewAction() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.createNewActionID({success: function(id) {
                let newAction = new i2Action();
                newAction.setID(id);
                resolve(newAction);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getActionsByVariantID(id) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getActionsByVariantID(id, {success: function(data) {
                let actions = [];
                for(let i = 0; i < data.length; i++) {
                    actions[i] = new i2Action();
                    actions[i].data = data[i];
                }
                resolve(actions);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getActionsByName(name) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getActionsByName(name, {success: function(data) {
                let actions = [];
                for(let i = 0; i < data.length; i++) {
                    actions[i] = new i2Action();
                    actions[i].data = data[i];
                }
                resolve(actions);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getActionByID(id) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getActionByID(id, {success: function(data) {
                let action = new i2Action();
                action.data = data;
                resolve(action);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }
}
