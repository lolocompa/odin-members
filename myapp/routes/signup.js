var express = require("express");
var router = express.Router();
var signup_controller = require("../controllers/sign-up_controller.js");

/* GET home page. */
router.get("/", function (req, res) {
  const is_user = req.user ? true : false;
  res.render("signup", { username_taken: null, is_user:is_user });
});

router.post("/create_user", signup_controller.signup);

module.exports = router;
