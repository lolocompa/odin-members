const mongoose = require("mongoose");

const schema = mongoose.Schema;

const msessageSchema = new schema({
  author: { type: schema.Types.ObjectId, ref: "user", required: true },
  date: { type: Date, default: Date.now },
  title: String,
  message_content: String,
});

module.exports = mongoose.model("messages", msessageSchema);
