"use strict";

import i2Model from "../src/i2Model.js";
import i2ModelBuilder from "../src/i2ModelBuilder.js";

i2ModelBuilder.createNewModel(function(testmodel) {
    testmodel.setName("Hallo Welt");
    testmodel.save(function(){
        alert(JSON.stringify(testmodel));
        testmodel.delete(function(){
            alert(JSON.stringify(testmodel));
        });
    });
});
