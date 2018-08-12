"use strict";

import { i2DatabaseObject } from "./i2DatabaseObject";


export class i2Model extends i2DatabaseObject{
    constructor(executor) {
        super(executor);
    }
    test () {
        alert('Hallo');
    }
}