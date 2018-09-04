"use strict";

class i2ActionMaterialType extends i2Action {
    constructor() {
        super();
        this.setType("i2ActionMaterialType");
        this.materialSelector = null;
        this.value = null;
        this.sceneRoot = null;
    }

    setData(data) {
        super.setData(data);
        let actionData = JSON.parse(data.action);
        if(this.materialSelector === undefined || this.materialSelector === null) {
            this.materialSelector = new i2MaterialNameSelector();
        }
        this.materialSelector.setSelectorData(actionData.materialSelector);
        this.value = new i2Value();
        this.value.setValueData(actionData.value);
    }

    getData() {
        this.data.action = JSON.stringify({
            materialSelector: this.materialSelector.getSelectorData(),
            value: this.value != null ? this.value.getValueData() : null
        });
        return super.getData();
    }

    setSceneRoot(sceneRoot) { this.sceneRoot = sceneRoot; }
    getSceneRoot() { return this.sceneRoot; }
    
    setMaterialSelector(sel) { this.materialSelector = sel; }
    getMaterialSelector() { return this.materialSelector; }

    setValue(value) { this.value = value; }
    getValue() { return this.value; }

    updateMaterialSettings(prevMaterial, material) {

        /* MeshLambertMaterial MeshPhongMaterial MeshStandardMaterial MeshPhysicalMaterial*/
        let m = this.getValue().getValueData();

        material.name = prevMaterial.name;
        material.color = prevMaterial.color;
        if(m == "MeshStandardMaterial" || m == "MeshPhysicalMaterial") {
            material.roughness = prevMaterial.roughness ? prevMaterial.roughness : 1;
            material.metalness = prevMaterial.metalness ? prevMaterial.metalness : 0;
        } else {
            delete material.roughness;
            delete material.metalness;
        }
        material.emissive = prevMaterial.emissive;
        if(m == "MeshPhysicalMaterial") {
            material.clearCoat = prevMaterial.clearCoat ? prevMaterial.clearCoat : 0;
            material.clearCoatRoughness = prevMaterial.clearCoatRoughness ? prevMaterial.clearCoatRoughness : 0;
        } else {
            delete material.clearCoat;
            delete material.clearCoatRoughness;
        }
        if(m == "MeshPhongMaterial") {
            material.specular = prevMaterial.specular ? prevMaterial.specular : new THREE.Color(0, 0, 0);
            material.shininess = prevMaterial.shininess ? prevMaterial.shininess : 30;
        } else {
            delete material.specular;
            delete material.shininess;
        }
        material.vertexColors = prevMaterial.vertexColors;
        material.skinning = prevMaterial.skinning;
        material.map = prevMaterial.map;
        material.alphaMap = prevMaterial.alphaMap;
        if(m == "MeshPhongMaterial" || m == "MeshStandardMaterial" || m == "MeshPhysicalMaterial") {
            material.bumpMap = prevMaterial.bumpMap;
            material.normalMap = prevMaterial.normalMap;
            material.displacementMap = prevMaterial.displacementMap;
        } else {
            delete material.bumpMap;
            delete material.normalMap;
            delete material.displacementMap;
        }
        if(m == "MeshStandardMaterial" || m == "MeshPhysicalMaterial") {
            material.roughnessMap = prevMaterial.roughnessMap;
            material.metalnessMap = prevMaterial.metalnessMap;
        } else {
            delete material.roughnessMap;
            delete material.metalnessMap;
        }
        if(m == "MeshLambertMaterial" || m == "MeshPhongMaterial") {
            material.specularMap = prevMaterial.specularMap;
        } else {
            delete material.specularMap;
        }
        material.envMap = prevMaterial.envMap;
        material.lightMap = prevMaterial.lightMap;
        material.aoMap = prevMaterial.aoMap;
        material.emissiveMap = prevMaterial.emissiveMap;
        material.side = prevMaterial.side;
        material.flatShading = prevMaterial.flatShading;
        material.blending = prevMaterial.blending;
        material.opacity = prevMaterial.opacity;
        material.transparent = prevMaterial.transparent;
        material.alphaTest = prevMaterial.alphaTest;
        material.wireframe = prevMaterial.wireframe;
    }
    execute() {
        let prevMaterial = this.getMaterialSelector().getMaterial();
        let material = new THREE[ this.value.getValueData() ]();
        material.overrides = prevMaterial.overrides;
        this.updateMaterialSettings(prevMaterial, material);
        this.getMaterialSelector().getMaterialCollection()[material.uuid] = material;
        this.getSceneRoot().traverse((object)=>{
            if ( Array.isArray( object.material ) ) {
                object.material.forEach((currMaterial) => {
                    if(currMaterial.uuid == prevMaterial.uuid) {
                        currMaterial = material;
                    }
                });
            } else {
                if(object.material !== undefined && object.material.uuid == object.material.uuid) {
                    object.material = material;
                }
            }
        });
    }
    revert(defaultMaterialType) {
        let prevMaterial = this.getMaterialSelector().getMaterial();
        let material = new THREE[ defaultMaterialType ]();
        material.overrides = prevMaterial.overrides;
        this.updateMaterialSettings(prevMaterial, material);
        this.getMaterialSelector().getMaterialCollection()[material.uuid] = material;
        this.getSceneRoot().traverse((object)=>{
            if ( Array.isArray( object.material ) ) {
                object.material.forEach((currMaterial) => {
                    if(currMaterial.uuid == prevMaterial.uuid) {
                        currMaterial = material;
                    }
                });
            } else {
                if(object.material !== undefined && object.material.uuid == object.material.uuid) {
                    object.material = material;
                }
            }
        });
    }
}
