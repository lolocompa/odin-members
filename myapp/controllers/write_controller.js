const message = require("../models/message_model");
const asyncHandler = require("express-async-handler");

exports.get_write = asyncHandler(async (req, res, next) => {
  const is_user = req.user ? true : false;
  res.render("write", { is_user: is_user });
});

exports.post_message = asyncHandler(async (req, res, next) => {
  const title = req.body.title;
  const message_content = req.body.message_content;
  const current_user_id = req.user.id;

  const new_message = new message({
    title: title,
    message_content: message_content,
    author: current_user_id,
  });

  const result = await new_message.save();
  res.redirect("/login");
});
