"use strict";

class i2ObjectsHierarchySelector extends i2Selector {
    constructor(sceneRoot, objects) {
        super();
        this.sceneRoot = sceneRoot;
        if(objects !== undefined) {
            this.setFromObjects(objects);
        }
    }

    setSceneRoot(sceneRoot) { this.sceneRoot = sceneRoot; }
    getSceneRoot() { return this.sceneRoot; }
    
    setFromObjects(objects) {
        let hierarchies = [];
        objects.forEach((object) => {
            let currObject = object;
            let hierarchyUp = [];
            while(currObject !== undefined && currObject != null) {
                hierarchyUp.push(currObject.name);
                currObject = currObject.parent;
            }
            hierarchies.push(hierarchyUp.reverse());
        });
        this.selectorData = hierarchies;
    }

    getObjects() {
        let objects = [];
        this.selectorData.forEach((selector) => {
            let currObject = this.sceneRoot;
            for(let i = 1; i < selector.length; ++i) {
                currObject = currObject.children.find((child) => {
                    return child.name == selector[i];
                })
            }
            objects.push(currObject);
        });
        return objects;
    }
}
