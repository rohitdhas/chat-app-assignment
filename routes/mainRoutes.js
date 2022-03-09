const {
  join_room,
  create_room,
  get_room,
} = require("../controller/room_controller");
const express = require("express");
const router = express.Router();

router.post("/join-room", join_room);
router.post("/create-room", create_room);
router.get("/room/:id", get_room);

module.exports = router;
