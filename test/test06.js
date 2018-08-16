"use strict";

import i2ModelBuilder from "../src/i2ModelBuilder.js";
import i2VariantBuilder from "../src/i2VariantBuilder.js";
import i2ActionBuilder from "../src/i2ActionBuilder.js";

// Test 06
// create new model, create new variant, create 2 actions, get all actions of variant 1, delete model

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

    console.log("Creating and adding 2 actions: 'Action1/2'");
    var a1 = await i2ActionBuilder.createNewAction();
    a1.setName("Action1");
    a1.addVariantID(v1.getID());
    await a1.save();
    var a2 = await i2ActionBuilder.createNewAction();
    a2.setName("Action2");
    a2.addVariantID(v1.getID());
    await a2.save();

    console.log("Get all actions of Variant1")
    var acts = await v1.getActions();
    console.log("Actions: " + JSON.stringify(acts));
    if(acts.length != 2) {
        console.error("Wrong number of actions");
    }

    console.log("cleaning up");
    await m1.delete();
    console.log("---TEST FINISHED---")
}

test();
