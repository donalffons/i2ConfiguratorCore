"use strict";

let scriptFile = document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1].src;
let scriptDir = scriptFile.substring(0,scriptFile.lastIndexOf("/")+1);

import * as importJQuery from 'https://code.jquery.com/jquery-3.3.1.js';
$ = window.$;
import {i2Model} from './i2Model.js';

export class i2Database {
    constructor() {
		this.PHPFile = scriptDir+"/../../src/i2Database.php";
	}
	
	POSTDatabase(data, cb) {
		$.ajax({
			url: this.PHPFile,
			type: "POST",
			data: data,
			dataType: "json",
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				console.error("Error POSTing to " + this.PHPFile + "!\n" +
				"With data: " + JSON.stringify(data) + "\n" +
				"Server responded with: " + e.status + " (" + e.statusText + ")\n" + 
				"Server responseText: " + e.responseText);
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
        });
	}

	// Model Functions
	
    getModelByID(id, cb) {
		this.POSTDatabase({api: "getModelByID", id: id}, {
			success: function(data) {
				let model = new i2Model();
				model.data = data;
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(model);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getModelByID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
	}
	
    getModelByPath(path, cb) {
		this.POSTDatabase({api: "getModelByPath", path: path}, {
			success: function(data) {
				let model = new i2Model();
				model.data = data;
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(model);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getModelByPath");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    getModelsByName(name, cb) {
		this.POSTDatabase({api: "getModelsByName", name: name}, {
			success: function(data) {
				let models = [];
				for(var i = 0; i < data.size(); ++i) {
					models[i] = new i2Model();
					models[i].data = data;
				}
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(model);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getModelsByName");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    createNewModelID(cb) {
		this.POSTDatabase({api: "createNewModelID"}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot createNewModelID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    saveModel(model, cb) {
		this.POSTDatabase({api: "saveModel", model: model}, {
			success: function() {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success();
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot saveModel");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    get3DFilesByModelID(id, cb) {
		this.POSTDatabase({api: "get3DFilesByModelID", id: id}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot get3DFilesByModelID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    deleteModelByID(id, cb) {
		this.POSTDatabase({api: "deleteModelByID", id: id}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot deleteModelByID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }

    // Variant Functions

    // Action Functions
}