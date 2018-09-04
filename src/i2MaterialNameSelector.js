"use strict";

class i2MaterialNameSelector extends i2Selector {
    constructor(materialCollection, sceneRoot, material) {
        super();
        this.materialCollection = materialCollection;
        if(material !== undefined) {
            this.setFromMaterial(material);
        }
    }

    setMaterialCollection(materialCollection) { this.materialCollection = materialCollection; }
    getMaterialCollection() { return this.materialCollection; }
    
    setFromMaterial(material) {
        this.selectorData = material.name;
    }

    getMaterial() {
        return Object.values(this.materialCollection).find((e) => {return e.name == this.selectorData});
    }
}
