const Room = require("../model/roomSchema");
const mongoose = require("mongoose");

const isValid = (id) => mongoose.Types.ObjectId.isValid(id);

const join_room = async (req, res) => {
  const { username, room_id, password } = req.body;

  // Checking if valid room id
  if (!isValid(room_id)) {
    res.status(404).json({ success: false, message: "Invalid Room ID!" });
    return;
  }

  try {
    // Checking if the room with this id exist
    const room = await Room.findById(room_id);
    if (!room) {
      res.status(404).json({ success: false, message: "Room Doesn't Exist!" });
    } else {
      if (room.online_users.includes(username)) {
        res
          .status(300)
          .json({ success: false, message: "Username is already taken!" });
      } else if (room.password !== password) {
        res
          .status(300)
          .json({ success: false, message: "Incorrect Password!" });
      } else {
        await Room.updateOne(
          { _id: room_id },
          { $push: { online_users: username } }
        );
        res.status(200).json({ success: true });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "ERR: Something Went Wrong!" });
  }
};

const create_room = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(200).json({ success: true, room_id: newRoom._id });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "ERR: Something Went Wrong!" });
  }
};

const get_room = async (req, res) => {
  const room_id = req.params.id;

  // Checking if valid room id
  if (!isValid(room_id)) {
    res.status(404).json({ success: false, message: "Invalid Room ID!" });
    return;
  }

  try {
    const room = await Room.findById(room_id);
    if (!room) {
      res.status(404).json({ success: false, message: "Room Doesn't Exist!" });
    } else {
      res.status(200).json({ success: true, data: room });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "ERR: Something Went Wrong!" });
  }
};

module.exports = { join_room, create_room, get_room };
