"use strict";

class i2DatabaseObject {
    constructor() {
        this.data = {};
        this.data.id = null;
        this.data.name = null;
        this.data.tags = {};
    }
    setData(data) { this.data = data; if(this.data.tags === undefined) { this.data.tags = {}; }}
    getData() { return this.data; }
    
    setID(id) { this.data.id = id; }
    getID() { return this.data.id; }

    setName(name) { this.data.name = name;}
    getName() {return this.data.name; }

    setTags(tags) { this.data.tags = tags; }
    getTags() { return this.data.tags; }
    addTag(tagname, tagvalue) { this.data.tags[tagname] = tagvalue; }
    removeTag(tagname) { delete this.data.tags[tagname]; }
}
