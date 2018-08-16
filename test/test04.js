"use strict";

// Test 04
// create new model, create new variant and attach to model, remove from model, delete both

async function test() {
    console.log("Creating Model 1: 'Model1'");
    var m1 = await i2ModelBuilder.createNewModel();
    m1.setName("Model1");
    await m1.save();

    console.log("Creating and adding variant: 'Variant1'");
    var v1 = await i2VariantBuilder.createNewVariant();
    v1.setName("Variant1");
    v1.addModelID(m1.getID());
    await v1.save();

    console.log("Checking if Variant1 belongs to Model1");
    var index = v1.getModelIDs().indexOf(m1.getID());
    if(index == -1) {
        console.error("No!");
    } else {
        console.log("yes")
    }

    console.log("Removing Variant1 from Model1")
    v1.removeModelID(m1.getID());
    await v1.save();

    console.log("Checking if Variant1 belongs to Model1");
    var index = v1.getModelIDs().indexOf(m1.getID());
    if(index == -1) {
        console.log("No!");
    } else {
        console.error("yes")
    }

    console.log("cleaning up");
    await m1.delete();
    await v1.delete();
    console.log("---TEST FINISHED---")
}

test();
