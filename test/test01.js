"use strict";

import i2ModelBuilder from "../src/i2ModelBuilder.js";

// Test 01
// create new model, save, delete

async function test() {
    console.log("creating new model");
    var testmodel = await i2ModelBuilder.createNewModel();
    testmodel.setName("Hallo Welt");
    console.log("model: " + JSON.stringify(testmodel));
    console.log("saving model");
    await testmodel.save();
    console.log("model: " + JSON.stringify(testmodel));
    console.log("deleting model");
    await testmodel.delete();
    console.log("model: " + JSON.stringify(testmodel));
    console.log("---TEST FINISHED---")
}

test();
