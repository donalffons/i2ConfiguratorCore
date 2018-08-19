"use strict";

class i2Variant extends i2DatabaseObject{
    constructor(executor) {
        super(executor);
        this.data.idmodel = [];
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

    getActions() { return i2ActionBuilder.getActionsByVariantID(this.getID()); }
}
