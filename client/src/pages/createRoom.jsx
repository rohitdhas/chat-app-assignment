/* eslint-disable jsx-a11y/anchor-is-valid */
import Footer from "../components/footer";
import { useState, useRef, useEffect } from "react";
import { BASE_SERVER_URL } from "../env_vars";
import { copyToClipboard } from "../helper/utils";

export default function CreateRoom() {
  const [room_name, setRoom_name] = useState("");
  const [password, setPassword] = useState("");
  const [room_id, setRoom_id] = useState("");
  const [copied, setCopied] = useState(false);
  const errRef = useRef("");

  async function create_room(e) {
    e.preventDefault();

    if (!room_name || !password) return;
    const response = await fetch(`${BASE_SERVER_URL}/create-room`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room_name, password }),
    });

    const data = await response.json();

    if (data.success) {
      errRef.current.classList.add("hidden");
      setRoom_id(data.room_id);
    } else {
      errRef.current.innerText = data.message;
      errRef.current.classList.remove("hidden");
    }
  }

  useEffect(() => {
    setCopied(false);
  }, [room_id]);

  return (
    <div className="h-screen flex align items-center flex-col bg-slate-700">
      <h1 className="text-2xl font-bold text-center mt-8 text-white">
        Create a new Chat Room ✨
      </h1>
      <form
        onSubmit={(e) => create_room(e)}
        className="w-2/6 p-4 border-2 border-slate-400 rounded-lg flex flex-col h-max my-10"
      >
        <div
          id="err_box"
          ref={errRef}
          className="hidden p-2 my-2 text-white font-bold text-center bg-red-400 rounded-md"
        ></div>
        <input
          type="text"
          placeholder="Room Name"
          required
          onChange={(e) => setRoom_name(e.target.value)}
          value={room_name}
          className="text-white font-bold bg-slate-800 outline-none p-2 rounded-md border-2 border-slate-500 focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-white font-bold bg-slate-800 my-2 outline-none p-2 rounded-md border-2 border-slate-500 focus:border-blue-500"
        />
        {room_id ? (
          <div className="mb-2">
            <div className="text-white flex align items-center justify-between font-bold py-2 px-4 rounded-md border-2 bg-slate-800 border-slate-500">
              <span>{room_id}</span>
              {copied ? (
                <i className="bi bi-clipboard-check text-blue-500 ml-2 px-2 rounded-md cursor-pointer hover:bg-slate-600"></i>
              ) : (
                <i
                  onClick={() => {
                    copyToClipboard(room_id);
                    setCopied(true);
                  }}
                  className="bi bi-clipboard ml-2 px-2 rounded-md cursor-pointer hover:bg-slate-600"
                ></i>
              )}
            </div>
            <p className="text-xs text-slate-300 my-1 px-1">
              Copy this 👆🏻 Room ID & use it for joining room!
            </p>
          </div>
        ) : (
          <></>
        )}
        <button
          onClick={(e) => create_room(e)}
          className="flex align items-center justify-center p-2 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer font-bold text-white"
        >
          Create Room
          <i className="bi bi-check-circle-fill ml-2"></i>
        </button>
        <p className="text-center font-semibold text-sm text-slate-300 mt-4">
          <a
            className="no-underline text-blue-500 hover:underline hover:text-blue-600"
            href="/"
          >
            Click here
          </a>{" "}
          to join a chat room!
        </p>
      </form>
      <Footer />
    </div>
  );
}
