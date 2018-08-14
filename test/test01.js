"use strict";

import i2Model from "../src/i2Model.js";
import i2ModelFactory from "../src/i2ModelFactory.js";

i2ModelFactory.createNewModel(function(testmodel) {
    testmodel.setName("Hallo Welt");
    testmodel.save(function(){
        alert(JSON.stringify(testmodel));
        testmodel.delete(function(){
            alert(JSON.stringify(testmodel));
        });
    });
});