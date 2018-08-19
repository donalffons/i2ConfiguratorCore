"use strict";

// Test 07
// create new model, add tag, remove tag and delete model

async function test() {
    console.log("Creating model");
    var model = await i2ModelBuilder.createNewModel();
    await model.save();

    console.log("adding a tag");
    model.addTag("sometag", "somevalue");
    console.log("saving model");
    await model.save();
    if(model.getTags()["sometag"] != "somevalue") {
        console.error("tag not correctly added to model!");
    }
    console.log("removing the tag");
    model.removeTag("sometag");
    if(Object.keys(model.getTags()).length != 0) {
        console.error("tag not correct removed from model!");
    }
    console.log("saving again");
    await model.save();
    model.delete();
    console.log("---TEST FINISHED---")
}

test();
