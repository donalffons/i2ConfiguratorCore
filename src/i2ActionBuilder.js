"use strict";

class i2ActionFactory {
    static instantiate(type){
        switch(type) {
            case "i2ActionObjectProperty":
                return new i2ActionObjectProperty();
            case "i2Action":
            default:
                return new i2Action();
        }
    }
}

class i2ActionBuilder {
    static createNewAction(type) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.createNewActionID({success: function(id) {
                let newAction = i2ActionFactory.instantiate(type);
                newAction.setID(id);
                resolve(newAction);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getActionsByVariantID(id) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getActionsByVariantID(id, {success: function(data) {
                if(data.length == 0) {
                    reject();
                    return;
                }
                let actions = [];
                for(let i = 0; i < data.length; i++) {
                    actions[i] = i2ActionFactory.instantiate(data[i].type);
                    actions[i].setData(data[i]);
                }
                resolve(actions);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getActionsByName(name) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getActionsByName(name, {success: function(data) {
                if(data.length == 0) {
                    reject();
                    return;
                }
                let actions = [];
                for(let i = 0; i < data.length; i++) {
                    actions[i] = i2ActionFactory.instantiate(data[i].type);
                    actions[i].setData(data[i]);
                }
                resolve(actions);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    static getActionByID(id) {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.getActionByID(id, {success: function(data) {
                if(data.length == 0) {
                    reject();
                    return;
                }
                let action = i2ActionFactory.instantiate(data.type);
                action.setData(data);
                resolve(action);
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }
}
