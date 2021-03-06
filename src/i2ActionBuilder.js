"use strict";

class i2ActionFactory {
    static instantiate(type){
        switch(type) {
            case "i2ActionMaterialType":
                    return new i2ActionMaterialType();
            case "i2ActionObjectProperty":
                    return new i2ActionObjectProperty();
            case "i2ActionAddObject":
                return new i2ActionAddObject();
            case "i2ActionMaterialProperty":
                return new i2ActionMaterialProperty();
            case "i2ActionMaterialMapImage":
                return new i2ActionMaterialMapImage();
            case "i2Action":
                return new i2Action();
            default:
                console.error("invalid action type specified");
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
                    resolve();
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
                    resolve();
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
                    resolve();
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
