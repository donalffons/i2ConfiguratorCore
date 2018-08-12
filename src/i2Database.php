<?php

require("i2DatabaseConf.php");

if(isset($_POST["api"])) {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD);
    if ($conn->connect_error) {
        trigger_error("Could not connect to database (responded with " . $conn->connect_error . ")", E_USER_ERROR);
    }
    $result = $conn->query("CREATE DATABASE IF NOT EXISTS i2configurator");
    $conn->select_db("i2configurator");
    $conn->set_charset("utf8");
    $result = $conn->query("CREATE TABLE IF NOT EXISTS `i2models` ( `id` INT NOT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `path` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM;");
    $result = $conn->query("CREATE TABLE IF NOT EXISTS `i2variants` ( `id` INT NOT NULL AUTO_INCREMENT , `id model` INT NOT NULL, `action` TEXT NOT NULL , `name` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM;");
    $result = $conn->query("CREATE TABLE IF NOT EXISTS `i2actions` ( `id` INT NOT NULL AUTO_INCREMENT , `id variant` INT NOT NULL, `type` TEXT NOT NULL , `action` TEXT NOT NULL , `name` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM;");
    header("Content-type: text/html;charset=utf-8");

    // Model Functions

    function getModelByID($id) {
        $conn = $GLOBALS['conn'];

        $result = $conn->query("SELECT * FROM i2models WHERE id = " . $id);
        $models = $result->fetch_all(MYSQLI_ASSOC);

        if(count($models) == 0) {
            trigger_error("API: " . __FUNCTION__ . ": No model found with id " . $id . ".", E_USER_ERROR);
        } else if(count($models) > 1) {
            trigger_error("API: " . __FUNCTION__ . ": More than one model found with id " . $id . ".", E_USER_ERROR);
        }
        return $models[0];
    }
    if($_POST["api"] == "getModelByID") {
        if(!isset($_POST["id"])) {
            trigger_error("API: " . __FUNCTION__ . ": No id parameter specified.", E_USER_ERROR);
        }
        echo json_encode(getModelByID($_POST["id"]));
    }

    function getModelByPath($path) {
        $conn = $GLOBALS['conn'];
        
        $result = $conn->query("SELECT * FROM i2models WHERE path = '" . $path . "'");
        $models = $result->fetch_all(MYSQLI_ASSOC);

        if(count($models) == 0) {
            trigger_error("API: " . __FUNCTION__ . ": No model found with path " . $path . ".", E_USER_ERROR);
        } else if(count($models) > 1) {
            trigger_error("API: " . __FUNCTION__ . ": More than one model found with path " . $path . ".", E_USER_ERROR);
        }
        return $models[0];
    }
    if($_POST["api"] == "getModelByPath") {
        if(!isset($_POST["path"])) {
            trigger_error("API: " . __FUNCTION__ . ": No path parameter specified.", E_USER_ERROR);
        }
        echo json_encode(getModelByPath($_POST["path"]));
    }

    function getModelsByName($name) {
        $conn = $GLOBALS['conn'];
        
        $result = $conn->query("SELECT * FROM i2models WHERE name = '" . $name . "'");
        $models = $result->fetch_all(MYSQLI_ASSOC);

        if(count($models) == 0) {
            trigger_error("API: " . __FUNCTION__ . ": No model found with path " . $path . ".", E_USER_ERROR);
        }
        return $models;
    }
    if($_POST["api"] == "getModelsByName") {
        if(!isset($_POST["name"])) {
            trigger_error("API: " . __FUNCTION__ . ": No name parameter specified.", E_USER_ERROR);
        }
        echo json_encode(getModelsByName($_POST["name"]));
    }

    function createNewModelID() {
        $conn = $GLOBALS['conn'];
        
        $result = $conn->query("INSERT INTO `i2models` (`id`, `name`, `path`) VALUES (NULL, '', '')");
        $models = $result->fetch_all(MYSQLI_ASSOC);

        return $conn->insert_id;
    }
    if($_POST["api"] == "createNewModelID") {
        echo json_encode(createNewModelID());
    }

    function saveModel($model) {
        $conn = $GLOBALS['conn'];
        
        $result = $conn->query("SELECT * FROM i2models WHERE id = " . $model["id"]);
        $models = $result->fetch_all(MYSQLI_ASSOC);

        if(count($models) == 0) {
            trigger_error("API: " . __FUNCTION__ . ": No model found with id " . $model["id"] . ".", E_USER_ERROR);
        } else if(count($models) > 1) {
            trigger_error("API: " . __FUNCTION__ . ": More than one model found with id " . $model["id"] . ".", E_USER_ERROR);
        }

        $result = $conn->query("INSERT INTO `i2models` (`id`, `name`, `path`) VALUES (" . $model["id"] . ", '" . $model["name"] . "', '" . $model["path"] . "')");

        return $conn->insert_id;
    }
    if($_POST["api"] == "saveModel") {
        if(!isset($_POST["model"])) {
            trigger_error("API: " . __FUNCTION__ . ": No model parameter specified.", E_USER_ERROR);
        }
        if(!isset($_POST["model"]["id"])) {
            trigger_error("API: " . __FUNCTION__ . ": No model id parameter specified.", E_USER_ERROR);
        }
        if(!isset($_POST["model"]["path"])) {
            trigger_error("API: " . __FUNCTION__ . ": No model path parameter specified.", E_USER_ERROR);
        }
        if(!isset($_POST["model"]["name"])) {
            trigger_error("API: " . __FUNCTION__ . ": No model name parameter specified.", E_USER_ERROR);
        }
        echo json_encode(saveModel($_POST["model"]));
    }

    function get3DFilesByModelID($id) {
        $conn = $GLOBALS['conn'];
        
        $result = $conn->query("SELECT * FROM i2models WHERE id = " . $id);
        $models = $result->fetch_all(MYSQLI_ASSOC);

        if(count($models) == 0) {
            trigger_error("API: " . __FUNCTION__ . ": No model found with id " . $model["id"] . ".", E_USER_ERROR);
        } else if(count($models) > 1) {
            trigger_error("API: " . __FUNCTION__ . ": More than one model found with id " . $model["id"] . ".", E_USER_ERROR);
        }

        $modeldir = MODEL_FOLDER . $models[0]["path"];
        $allfiles = array_diff(scandir($modeldir), array('.', '..'));
        $threedfiles = [];
        foreach($allfiles as $file) {
            if(in_array(pathinfo($file, PATHINFO_EXTENSION), ["3ds","amf","awd","babylon","babylonmeshdata","ctm","dae","fbx","glb","gltf","js","json","3geo","3mat","3obj","3scn","kmz","md2","obj","playcanvas","ply","stl","svg","vtk","wrl"])) {
                array_push($threedfiles, $file);
            }
        }

        return $threedfiles;
    }
    if($_POST["api"] == "get3DFilesByModelID") {
        if(!isset($_POST["id"])) {
            trigger_error("API: " . __FUNCTION__ . ": No id parameter specified.", E_USER_ERROR);
        }
        echo json_encode(get3DFilesByModelID($_POST["id"]));
    }

    function deleteModelByID($id) {
        $conn = $GLOBALS['conn'];
        
        $result = $conn->query("SELECT * FROM i2models WHERE id = " . $id);
        $models = $result->fetch_all(MYSQLI_ASSOC);

        if(count($models) == 0) {
            trigger_error("API: " . __FUNCTION__ . ": No model found with id " . $model["id"] . ".", E_USER_ERROR);
        } else if(count($models) > 1) {
            trigger_error("API: " . __FUNCTION__ . ": More than one model found with id " . $model["id"] . ".", E_USER_ERROR);
        }

        $result = $conn->query("DELETE FROM `i2models` WHERE id='" . $id . "'");

        // Check and delete associated variants
        $resultVariants = $conn->query("SELECT * FROM i2variants WHERE 'id model' REGEXP \\b" . $id . "\\b");
        $variants = $resultVariants->fetch_all(MYSQLI_ASSOC);
        foreach($variants as $variant) {
            // Remove model id entry from variant row
            $jsonModelID = json_decode($variant["id model"]);
            $posModel = array_search($id, $jsonModelID);
            unset($jsonModelID[$posModel]);
            $conn->query("INSERT INTO `i2variants` (`id`, `id model`, `name`) VALUES (" . $variant["id"] . ", '" . $variant["id model"] . "', '" . $variant["name"] . "') ON DUPLICATE KEY UPDATE 'id model'='" . $variant["id model"] . "'");
            // Variant has no more models associated, deleting...
            if(count($jsonModelID) < 1) {
                $conn->query("DELETE FROM `i2variants` WHERE id='" . $variant["id"] . "'");

                // Check and delete associated actions
                $resultActions = $conn->query("SELECT * FROM i2actions WHERE 'id variant' REGEXP \\b" . $variant["id"] . "\\b");
                $actions = $resultActions->fetch_all(MYSQLI_ASSOC);
                foreach($actions as $action) {
                    // Remove variant id entry from action row
                    $jsonVariantID = json_decode($action["id variant"]);
                    $posVariant = array_search($variant["id"], $jsonVariantID);
                    unset($jsonVariantID[$posVariant]);
                    $conn->query("INSERT INTO `i2actions` (`id`, `id variant`, `type`, `action`, `name`) VALUES (" . $action["id"] . ", '" . $action["id variant"] . "', '" . $action["type"] . "', '" . $action["action"] . "', '" . $action["name"] . "') ON DUPLICATE KEY UPDATE 'id variant'='" . $variant["id variant"] . "'");
                    // Action has no more modevariantsls associated, deleting...
                    if(count($jsonVariantID) < 1) {
                        $conn->query("DELETE FROM `i2actions` WHERE 'id' = '" . $variant["id"] . "'");
                    }
                }
            }
        }

        return "";
    }
    if($_POST["api"] == "deleteModelByID") {
        if(!isset($_POST["id"])) {
            trigger_error("API: " . __FUNCTION__ . ": No id parameter specified.", E_USER_ERROR);
        }
        echo json_encode(deleteModelByID($_POST["id"]));
    }

    // Variant Functions

    // Action Functions

    $conn->close();
} else {
    trigger_error("No API specified.", E_USER_ERROR);
}
?>