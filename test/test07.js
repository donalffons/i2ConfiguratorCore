"use strict";

// Test 07
// create new model, add tag, remove tag and delete model

async function test() {
    var model = await i2ModelBuilder.createNewModel();
    await model.save();

    model.addTag("sometag", "somevalue");
    await model.save();
    if(model.getTags()["sometag"] != "somevalue") {
        console.error("tag not correctly added to model!");
    }
    model.removeTag("sometag");
    if(Object.keys(model.getTags()).length != 0) {
        console.error("tag not correct removed from model!");
    }
    await model.save();
    model.delete();
    console.log("---TEST FINISHED---")
}

test();
