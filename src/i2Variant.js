"use strict";

class i2Variant extends i2DatabaseObject{
    constructor(executor) {
        super(executor);
        this.data.idmodel = [];
        this.actions = undefined;
        this.removedActions = [];
    }
    
    setModelIDs(ids) { this.data.idmodel = ids; }
    getModelIDs() { return this.data.idmodel; }
    addModelID(id) {
        if (this.data.idmodel.indexOf(id) > -1) {
            return;
        }
        this.data.idmodel[this.data.idmodel.length] = id;
    }
    removeModelID(id) {
        var index = this.data.idmodel.indexOf(id);
        if (index > -1) {
            this.data.idmodel.splice(index, 1);
        }
    }
    
    async save() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.saveVariant(this.getData(), {success: (data) => {
                this.setData(data);
                resolve();
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    async delete() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.deleteVariantByID(this.getID(), {success: () => {
                delete this.data;
                resolve();
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    async getActions(forceUpdateFromServer = false) {
        if(this.actions === undefined || forceUpdateFromServer) {
            this.actions = await i2ActionBuilder.getActionsByVariantID(this.getID());
            if(this.actions === undefined) {
                this.actions = [];
            }
        }
        return this.actions;
    }
    async addAction(action) {
        await this.getActions();
        this.actions.push(action);
        action.addVariantID(this.getID());
    }
    async removeAction(action) {
        await this.getActions();
        let ind = this.actions.findIndex(element => {
            return element.getID() == action.getID();
        });
        this.actions.splice(ind, 1);
        this.removedActions.push(action);

        action.removeVariantID(this.getID());
    }
    async updateActionsOnServer() {
        await this.getActions();
        this.actions.forEach(action => {
            action.save();
        });
        this.removedActions.forEach(action => {
            if(action.getVariantIDs().length == 0) {
                action.delete();
            } else {
                action.save();
            }
        });
        this.removedActions = [];
    }
}
