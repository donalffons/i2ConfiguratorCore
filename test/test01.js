"use strict";

import i2ModelBuilder from "../src/i2ModelBuilder.js";

console.log("creating new model");
i2ModelBuilder.createNewModel(function(testmodel) {
    testmodel.setName("Hallo Welt");
    console.log("model: " + JSON.stringify(testmodel));
    console.log("saving model");
    testmodel.save(function(){
        console.log("model: " + JSON.stringify(testmodel));
        console.log("deleting model");
        testmodel.delete(function(){
            console.log("model: " + JSON.stringify(testmodel));
            console.log("---TEST FINISHED---")
        });
    });
});
