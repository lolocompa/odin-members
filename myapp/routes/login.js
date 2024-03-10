var express = require("express");
var router = express.Router();
var login_controller = require("../controllers/login_controller.js")

/* GET users listing. */
router.get("/", login_controller.get_login);

router.post("/log_user", login_controller.login)

module.exports = router;
