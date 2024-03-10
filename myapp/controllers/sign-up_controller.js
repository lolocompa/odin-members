const user = require("../models/users_model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.signup = asyncHandler(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashed_password = await bcrypt.hash(password, 10);

  const is_username = await user.find({ username: username });
  if (is_username.length > 0) {
    const is_user = req.user ? true : false;
    res.render("signup", {
      username_taken: "this username already exists",
      is_user: is_user,
    });
    return;
  }

  const added_user = new user({
    username: username,
    password: hashed_password,
  });

  const result = await added_user.save();
  res.redirect("/login");
});
