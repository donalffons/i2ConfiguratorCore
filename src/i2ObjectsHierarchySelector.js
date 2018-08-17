"use strict";

class i2ObjectsHierarchySelector extends i2Selector {
    constructor(sceneRoot, objects) {
        super();
        this.sceneRoot = sceneRoot;
        if(objects !== undefined) {
            this.setFromObjects(objects);
        }
    }
    
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
        this.selectorString = JSON.stringify(hierarchies);
    }

    getObjects() {
        let selectors = JSON.parse(this.selectorString);
        let objects = [];
        selectors.forEach((selector) => {
            let currObject = this.sceneRoot;
            for(let i = 1; i < selector.length; ++i) {
                currObject = currObject.children.find((child) => {
                    return child.name == selector[i].name;
                })
            }
            objects.push(currObject);
        });
        return objects;
    }
}
