"use strict";

// Test 08
// create two models, add same tagnames with different tagvalues, delete models

async function test() {
    console.log("Creating model1");
    var model1 = await i2ModelBuilder.createNewModel();
    await model1.save();
    console.log("Creating model2");
    var model2 = await i2ModelBuilder.createNewModel();
    await model2.save();

    console.log("adding a tag to both");
    model1.addTag("sometag", "somevalue");
    model2.addTag("sometag", "someothervalue");
    console.log("deleting model1");
    model1.delete();
    console.log("sometag of model2 equals " + model2.getTags()["sometag"]);
    if(model2.getTags()["sometag"] != "someothervalue") {
        console.error("not as expected");
    }
    console.log("deleting model2");
    model2.delete();
    console.log("[the tag column should not also be delted, this cannot be tested in this test.]");
    console.log("---TEST FINISHED---")
}

test();
