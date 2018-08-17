"use strict";

class i2ObjectsHierarchySelector extends i2Selector {
    constructor(sceneRoot) {
        super();
        this.sceneRoot = sceneRoot;
    }
    
    setFromObjects(objects) {
        let hierarchies = [];
        objects.forEach((object) => {
            let currObject = object;
            let hierarchyUp = [];
            while(currObject !== undefined && currObject != null) {
                hierarchyUp.push(currObject.name);
                currObject = object.parent;
            }
            hierarchies.push(hierarchyUp.reverse());
        });
        selectorString = JSON.stringify(hierarchies);
    }

    getObjects() {
        selectors = JSON.parse(this.selectorString);
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
