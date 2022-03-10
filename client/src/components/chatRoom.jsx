import { getValue, uidGenerator } from "../helper/utils";
import { useState, useRef, useEffect } from "react";

export default function ChatRoom({
  room_name,
  messages,
  sendMessage,
  leaveRoom,
}) {
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const inputBox = document.getElementById("fake_textarea");
    inputBox.contentEditable = true;
  }, []);

  return (
    <div className="h-full styled-scrollbar overflow-auto w-55-per px-2 py-6 relative border-2 border-slate-500 rounded-md ml-4">
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
      <div className="w-full shadow-md bg-slate-600 px-10 py-2 fixed bottom-0 left-0 right-0 flex justify-center align items-center">
        <div className="border-2 border-slate-500 rounded-md p-4 w-4/5">
          <div className="text-gray-300 font-bold">
            <i className="bi bi-type-bold mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700"></i>
            <i className="bi bi-type-italic mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700"></i>
            <i className="bi bi-type-strikethrough mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700"></i>
            <i className="bi bi-link-45deg mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700 border-x border-x-slate-300"></i>
            <i className="bi bi-list-ol mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700 border-l border-l-slate-300"></i>
            <i className="bi bi-list-ul mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700 border-r border-r-slate-300"></i>
            <i className="bi bi-blockquote-right mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700 border-x border-x-slate-300"></i>
            <i className="bi bi-code-slash mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700"></i>
            <i className="bi bi-code-square mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700"></i>
          </div>
          <div
            ref={inputRef}
            id="fake_textarea"
            className="my-2 p-2 div-placeholder text-gray-300 text-sm outline-none overflow-auto styled-scrollbar max-h-10 bg-slate-700 rounded-sm"
            data-text="Chat comes here..."
          ></div>
          <div className="text-gray-300 font-bold flex justify-between">
            <span>
              <i className="bi bi-upload mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700 border-r border-r-slate-300"></i>
              <i className="bi bi-emoji-laughing mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700"></i>
              <i className="bi bi-at mx-1 cursor-pointer px-1 rounded-sm hover:bg-slate-700"></i>
            </span>
            <button
              onClick={(e) => {
                sendMessage(e, message);
                setMessage("");
              }}
              className="rounded-md px-4 text-white font-bold bg-blue-500 cursor-pointer hover:bg-blue-600 mx-2"
            >
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
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
