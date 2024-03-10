var express = require("express");
var router = express.Router();
var index_controller = require("../controllers/index_controller.js");


/* GET home page. */
router.get("/", index_controller.index);

module.exports = router;
