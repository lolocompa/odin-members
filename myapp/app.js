var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const initialize_passport = require("./config/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var writeRouter = require("./routes/write");
var deleteRouter = require("./routes/delete");



var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

async function main() {
  try {
    const db = await mongoose.connect("mongodb://0.0.0.0:27017/user_auth", {});

    console.log("Connected to the database");

    // Optional: Log additional connection information
    db.connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
    });

    db.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    db.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from MongoDB");
    });
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
}

main();

initialize_passport(passport);
app.use(flash())
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/sign-up", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/write", writeRouter);
app.use("/delete_message", deleteRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
