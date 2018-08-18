"use strict";

class i2Action extends i2DatabaseObject{
    constructor(executor) {
        super(executor);
        this.data = {};
        this.data.id = null;
        this.data.name = null;
        this.data.idvariant = [];
        this.data.type = null;
        this.data.action = null;
    }
    setData(data) { this.data = data; }
    getData() { return this.data; }

    setID(id) { this.data.id = id; }
    getID() { return this.data.id; }

    setName(name) { this.data.name = name; }
    getName() {return this.data.name; }

    setType(type) { this.data.type = type; }
    getType() {return this.data.type; }

    setAction(action) { this.data.action = action; }
    getAction() {return this.data.action; }

    setVariantIDs(ids) { this.data.idvariant = ids; }
    getVariantIDs() { return this.data.idvariant; }
    addVariantID(id) {
        if (this.data.idvariant.indexOf(id) > -1) {
            return;
        }
        this.data.idvariant[this.data.idvariant.length] = id;
    }
    removeVariantID(id) {
        var index = this.data.idvariant.indexOf(id);
        if (index > -1) {
            this.data.idvariant.splice(index, 1);
        }
    }

    async save() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.saveAction(this.getData(), {success: (data) => {
                this.setData(data);
                resolve();
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }

    async delete() {
        let promise = new Promise((resolve, reject) => {
            i2DatabaseDefault.deleteActionByID(this.getID(), {success: () => {
                delete this.data;
                resolve();
            }, error: function(e) {reject(e);}});
        });
        return promise;
    }
}


