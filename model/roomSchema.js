const mongoose = require("mongoose");

const Room = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  online_users: [{ type: String }],
});

module.exports = mongoose.model("Room", Room);
