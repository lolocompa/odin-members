const user = require("../models/users_model");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const flash = require("express-flash");

exports.get_login = asyncHandler(async (req, res, next) => {
  const is_user = req.user ? true : false;
  if (is_user === true) {
    res.redirect("/");
  }
  res.render("login", { is_user: is_user });
});

exports.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});
