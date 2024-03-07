var express = require("express");
var router = express.Router();
const book_controller = require("../controllers/book_controller.js");

/* GET home page. */
router.get("/", book_controller.index);

router.get("/all", book_controller.all);

router.get("/form", function (req, res, next) {
  res.render("../views/create.ejs");
});

router.post("/create_book", book_controller.create)

router.get("/:id", book_controller.item)

module.exports = router;
