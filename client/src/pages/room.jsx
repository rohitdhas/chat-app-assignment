import io from "socket.io-client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import { BASE_SERVER_URL } from "../env_vars";
import { getValue, getTime, clearSession } from "../helper/utils";
import Sidebar from "../components/sidebar";
import ChatRoom from "../components/chatRoom";

const socket = io.connect(BASE_SERVER_URL);

export default function Room() {
  const [roomData, setRoomData] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  const validateRoom = useCallback(async () => {
    setIsLoading(true);

    if (!getValue("joined_room")) {
      history.replace("/");
      history.push("404");
    } else {
      const response = await fetch(`${BASE_SERVER_URL}/room/${id}`);
      const data = await response.json();
      setIsLoading(false);

      if (!data.success) {
        history.replace("/");
        history.push("404");
      } else {
        setRoomData(data.data);

        await socket.emit("join-room", {
          room_id: id,
          username: getValue("username"),
        });
      }
    }
  }, [history, id]);

  useEffect(() => {
    validateRoom();
    if (!socket) return;

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [validateRoom]);

  async function sendMessage(e, message) {
    e.preventDefault();

    const message_data = {
      message,
      time: getTime(),
      sender: getValue("username"),
      type: "text",
    };
    setMessages((prev) => [...prev, message_data]);
    await socket.emit("send_message", { room_id: id, message_data });
  }

  function leaveRoom() {
    socket.emit("leave-room", { room_id: id, username: getValue("username") });
    clearSession();
    window.location.pathname = "/";
  }

  return (
    <div className="h-screen w-screen flex align items-center justify-center bg-slate-700">
      {isLoading ? (
        <div className="px-6 py-2 my-2 text-white font-bold text-center bg-blue-500 rounded-md">
          Joining Room...
          <i className="bi bi-broadcast ml-2"></i>
        </div>
      ) : (
        <div className="h-3/4 flex w-full justify-center">
          <Sidebar users={roomData.online_users} />
          <ChatRoom
            sendMessage={sendMessage}
            leaveRoom={leaveRoom}
            messages={messages}
            room_name={roomData.room_name}
          />
        </div>
      )}
    </div>
  );
}
