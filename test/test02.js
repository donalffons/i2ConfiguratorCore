"use strict";

import i2ModelBuilder from "../src/i2ModelBuilder.js";

// Test 02
// create multiple new models, get by name, delete all

async function test() {
    console.log("Creating Model 1: 'Model'");
    var m1 = await i2ModelBuilder.createNewModel();
    m1.setName("Model");
    await m1.save();
    console.log("Creating Model 2: 'Model'");
    var m2 = await i2ModelBuilder.createNewModel();
    m2.setName("Model");
    await m2.save();
    console.log("Creating Model 3: 'Model'");
    var m3 = await i2ModelBuilder.createNewModel();
    m3.setName("Model");
    await m3.save();

    console.log("Get all models with name 'Model'");
    var models = await i2ModelBuilder.getModelsByName("Model");
    console.log(models.length + " models found.");
    if(models.length != 3) {
        console.error("number of models should be 3, but it is " + models.length + "!");
    }
    console.log("models: " + JSON.stringify(models));
    console.log("deleting models");
    await m1.delete();
    await m2.delete();
    await m3.delete();
    console.log("Get all models with name 'Model'");
    var models = await i2ModelBuilder.getModelsByName("Model");
    console.log(models.length + " models found.");
    if(models.length != 0) {
        console.error("number of models should be 0, but it is " + models.length + "!");
    }
    console.log("---TEST FINISHED---")
}

test();
