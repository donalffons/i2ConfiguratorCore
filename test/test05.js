"use strict";

import i2ModelBuilder from "../src/i2ModelBuilder.js";
import i2VariantBuilder from "../src/i2VariantBuilder.js";

// Test 05
// create new model, Create 2 variants and attach to model, get variants by model Id

async function test() {
    console.log("Creating Model 1: 'Model1'");
    var m1 = await i2ModelBuilder.createNewModel();
    m1.setName("Model1");
    await m1.save();

    console.log("Creating and adding 2 variant2: 'Variant1/2'");
    var v1 = await i2VariantBuilder.createNewVariant();
    v1.setName("Variant1");
    v1.addModelID(m1.getID());
    await v1.save();
    var v2 = await i2VariantBuilder.createNewVariant();
    v2.setName("Variant2");
    v2.addModelID(m1.getID());
    await v2.save();

    console.log("Get all variants of Model1")
    var vars = await m1.getVariants();
    console.log("Variants: " + JSON.stringify(vars));
    if(vars.length != 2) {
        console.error("Wrong number of variants");
    }

    console.log("cleaning up");
    await m1.delete();
    console.log("---TEST FINISHED---")
}

test();
