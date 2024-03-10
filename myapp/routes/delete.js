var express = require("express");
var router = express.Router();
const messages = require("../models/message_model");

/* GET users listing. */
router.post("/", async function (req, res, next) {
  const id = req.body.message_id;
  const delete_message = await messages.findByIdAndDelete(id);
  res.redirect("/");
});

module.exports = router;
