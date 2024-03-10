const messages = require("../models/message_model");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const username = req.user ? req.user.username : null;
  const is_user = req.user ? true : false;

  const all_messages = await messages.find({}).populate("author", "username");

  res.render("index", {
    user: username,
    is_user: is_user,
    all_messages: all_messages,
  });
});
