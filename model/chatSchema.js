const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chat = new Schema({
  sender: String,
  message: String,
  time: String,
});

module.exports = mongoose.model("Chat", Chat);
