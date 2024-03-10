var express = require("express");
var router = express.Router();
var write_controller = require("../controllers/write_controller.js");

/* GET users listing. */
router.get("/", write_controller.get_write);

router.post("/post_message", write_controller.post_message)

module.exports = router;
