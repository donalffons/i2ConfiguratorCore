"use strict";

class i2ActionAddObject extends i2Action {
    constructor() {
        super();
        this.setType("i2ActionAddObject");
        this.objectsSelectorParent = null;
        this.value = null;
        this.onObjectAdded = undefined;
    }

    setData(data) {
        super.setData(data);
        let actionData = JSON.parse(data.action);
        this.objectsSelectorParent = new i2ObjectsHierarchySelector(null);
        this.objectsSelectorParent.setSelectorData(actionData.objectsSelectorParent);
        this.value = new i2Value();
        this.value.setValueData(actionData.value);
    }

    getData() {
        this.data.action = JSON.stringify({
            objectsSelectorParent: this.objectsSelectorParent.getSelectorData(),
            value: this.value
        });
        return super.getData();
    }
    
    setObjectsSelector(sel) { this.objectsSelectorParent = sel; }
    getObjectsSelector() { return this.objectsSelectorParent; }

    setValue(value) { this.value = value; }
    getValue() { return this.value; }

    setOnObjectAdded(cb) { this.onObjectAdded = cb; }
    getOnObjectAdded() { return this.onObjectAdded; }

    execute() {
        let parent = this.objectsSelectorParent.getObjects();
        if(parent.length != 1) {
            console.error("invalid parent!");
            return;
        }

        var loader = new THREE.ObjectLoader();
        if(Array.isArray(this.value.getValueData())) {
            this.value.getValueData().forEach(element => {
                loader.parse( element, object => {
                    parent[0].add(object);
                    if(this.onObjectAdded !== undefined) {
                        this.onObjectAdded(object);
                    }
                });
            });
        } else {
            loader.parse( this.value.getValueData(), object => {
                parent[0].add(object);
                if(this.onObjectAdded !== undefined) {
                    this.onObjectAdded(object);
                }
            });
        }
    }
}
