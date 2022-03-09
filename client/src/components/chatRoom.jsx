import { getValue, uidGenerator } from "../helper/utils";
import { useState } from "react";

export default function ChatRoom({
  room_name,
  messages,
  sendMessage,
  leaveRoom,
}) {
  const [message, setMessage] = useState("");

  return (
    <div className="h-full styled-scrollbar overflow-auto w-3/5 px-2 py-6 relative border-2 border-slate-500 rounded-md ml-4">
      <div className="w-full shadow-md bg-slate-600 px-10 py-2 fixed top-0 left-0 right-0 flex justify-between align items-center">
        <span className="font-bold text-white text-xl flex align items-center">
          <i className="bi bi-chat-right mr-2"></i>
          <span>{room_name}</span>
        </span>
        <button
          onClick={leaveRoom}
          className="font-bold bg-red-400 px-4 py-2 rounded-md text-white cursor-pointer hover:bg-red-500"
        >
          Exit Room
          <i className="bi bi-box-arrow-left ml-1"></i>
        </button>
      </div>
      <div className="w-full shadow-md bg-slate-600 px-10 py-2 fixed bottom-0 left-0 right-0 flex justify-between align items-center">
        <form className="align items-center flex">
          <i className="bi bi-emoji-laughing mr-4 text-2xl text-yellow-300 font-bold cursor-pointer hover:text-yellow-400"></i>
          <input
            type="text"
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
            className="text-white font-bold bg-slate-800 outline-none p-2 rounded-md border-2 border-slate-500 focus:border-blue-600"
          />
          <button
            onClick={(e) => {
              sendMessage(e, message);
              setMessage("");
            }}
            className="p-2 rounded-md text-white font-bold bg-blue-500 cursor-pointer hover:bg-blue-600 mx-2"
          >
            Send
            <i className="bi bi-send ml-2"></i>
          </button>
        </form>
      </div>
      <div>
        {messages.map((msg) => {
          return <Message message_data={msg} key={uidGenerator()} />;
        })}
      </div>
    </div>
  );
}

function Message({ message_data }) {
  const { message, sender, type, time } = message_data;
  const username = getValue("username");

  if (type === "file") {
    return (
      <>
        {sender !== username ? (
          <div className="max-w-xs">
            <div className="px-4 py-2 rounded-md flex justify-between font-bold bg-slate-600 text-white">
              <span>{sender} sent a file</span>
              <i className="bi bi-file-earmark-arrow-down cursor-pointer px-1 rounded-md hover:bg-slate-800"></i>
            </div>
            <div className="text-xs text-slate-400 mt-1">{time}</div>
          </div>
        ) : (
          <div className="max-w-xs ml-auto">
            <div className="px-4 py-2 rounded-md bg-blue-500 text-white font-bold">
              <span>{sender} sent a file</span>
              <i className="bi bi-file-earmark-text"></i>
            </div>
            <div className="text-xs text-slate-400 text-right mt-1">{time}</div>
          </div>
        )}
      </>
    );
  }

  if (sender === "bot") {
    return (
      <div className="max-w-xs my-2 mx-auto text-xs text-center">
        <div className="p-2 rounded-full bg-slate-600 text-white font-bold">
          <span>{message}</span>
        </div>
      </div>
    );
  } else if (sender !== username) {
    return (
      <div className="max-w-xs">
        <div className="px-4 py-2 rounded-md bg-slate-600 text-white">
          <span className="font-bold">{sender} - </span>
          <span>{message}</span>
        </div>
        <div className="text-xs text-slate-400 mt-1">{time}</div>
      </div>
    );
  } else {
    return (
      <div className="max-w-xs ml-auto">
        <div className="px-4 py-2 rounded-md bg-blue-500 text-white font-bold">
          <span>{message}</span>
        </div>
        <div className="text-xs text-slate-400 text-right mt-1">{time}</div>
      </div>
    );
  }
}
