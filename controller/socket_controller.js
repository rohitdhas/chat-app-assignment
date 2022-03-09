const Room = require("../model/roomSchema");
const { server } = require("../server");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", ({ room_id, username }) => {
    socket.join(room_id);

    socket.to(room_id).emit("receive_message", {
      sender: "bot",
      message: `${username} Joined!`,
    });
  });

  socket.on("leave-room", async ({ username, room_id }) => {
    socket
      .to(room_id)
      .emit("receive_message", { sender: "bot", message: `${username} left!` });
    socket.leave(room_id);
    await Room.findOneAndUpdate(
      { _id: room_id },
      { $pull: { online_users: username } }
    );
  });

  socket.on("send_message", ({ message_data, room_id }) => {
    socket.to(room_id).emit("receive_message", message_data);
  });
});
