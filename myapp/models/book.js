const mongoose = require("mongoose");

const schema = mongoose.Schema;

const bookSchema = new schema({
  title: { type: String, required: true },
  price: Number,
  count: Number,
  description: String,
  category: String,
  author: String,
});

module.exports = mongoose.model("book", bookSchema);
