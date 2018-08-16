"use strict";

let scriptFile = document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1].src;
let scriptDir = scriptFile.substring(0,scriptFile.lastIndexOf("/")+1);

import * as importJQuery from 'https://code.jquery.com/jquery-3.3.1.js';
$ = window.$;
//import {i2Model} from './i2Model.js';
//import {i2Variant} from './i2Variant.js';
//import {i2Action} from './i2Action.js';

export class i2Database {
    constructor() {
		this.PHPFile = scriptDir+"/../../src/i2Database.php";
	}
	
	POSTDatabase(data, cb) {
		let PHPFile = this.PHPFile;
		$.ajax({
			url: PHPFile,
			type: "POST",
			data: data,
			dataType: "json",
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				console.error("Error POSTing to " + PHPFile + "!\n" +
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
	
    getModels(cb) {
		this.POSTDatabase({api: "getModels"}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getModels");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
	}
	
    getModelByID(id, cb) {
		this.POSTDatabase({api: "getModelByID", id: id}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
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
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
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
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
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
	
    saveModel(data, cb) {
		this.POSTDatabase({api: "saveModel", model: data}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
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
			success: function() {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success();
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
	
    getVariantsByModelID(id, cb) {
		this.POSTDatabase({api: "getVariantsByModelID", id: id}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getVariantsByModelID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    getVariantByID(id, cb) {
		this.POSTDatabase({api: "getVariantByID", id: id}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getVariantByID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
	}
	
    getVariantsByName(name, cb) {
		this.POSTDatabase({api: "getVariantsByName", name: name}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getVariantsByName");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    createNewVariantID(cb) {
		this.POSTDatabase({api: "createNewVariantID"}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot createNewVariantID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    saveVariant(variant, cb) {
		this.POSTDatabase({api: "saveVariant", variant: variant}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot saveVariant");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    deleteVariantByID(id, cb) {
		this.POSTDatabase({api: "deleteVariantByID", id: id}, {
			success: function() {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success();
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot deleteVariantByID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }

    // Action Functions
	
    getActionsByVariantID(id, cb) {
		this.POSTDatabase({api: "getActionsByVariantID", id: id}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getActionsByVariantID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    getActionByID(id, cb) {
		this.POSTDatabase({api: "getActionByID", id: id}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getActionByID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
	}
	
    getActionsByName(name, cb) {
		this.POSTDatabase({api: "getActionsByName", name: name}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot getActionsByName");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    createNewActionID(cb) {
		this.POSTDatabase({api: "createNewActionID"}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot createNewActionID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    saveAction(action, cb) {
		this.POSTDatabase({api: "saveAction", action: action}, {
			success: function(data) {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success(data);
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot saveAction");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
	
    deleteActionByID(id, cb) {
		this.POSTDatabase({api: "deleteActionByID", id: id}, {
			success: function() {
				if(cb !== undefined && cb.success !== undefined) {
					cb.success();
				}
			},
			error: function(e) {
				if(cb !== undefined && cb.error !== undefined) {
					cb.error(e);
				}
				console.error("Cannot deleteActionByID");
			},
			complete: function() {
				if(cb !== undefined && cb.complete !== undefined) {
					cb.complete();
				}
			}
		});
    }
}

let i2DatabaseDefault = new i2Database();
export default i2DatabaseDefault;
