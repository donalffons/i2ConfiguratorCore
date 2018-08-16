"use strict";

// Test 03
// create new model, get by id, get by path, delete, delete the same model multiple times

async function test() {
    console.log("Creating Model 1: 'Model'");
    var m1 = await i2ModelBuilder.createNewModel();
    m1.setName("Model");
    await m1.save();
    console.log("Get Model by id");
    var m1ByID = await i2ModelBuilder.getModelByID(m1.getID());
    console.log("model name: " + m1ByID.getName());
    if(m1ByID.getName() != "Model") {
        console.error("did not return correct model name");
    }
    console.log("Get Model by path");
    var m1ByPath = await i2ModelBuilder.getModelByByPath(m1.getPath());
    console.log("model name: " + m1ByPath.getName());
    if(m1ByPath.getName() != "Model") {
        console.error("did not return correct model name");
    }
    console.log("cleaning up");
    await m1.delete();
    await m1ByID.delete();
    await m1ByPath.delete();
    console.log("---TEST FINISHED---")
}

test();
