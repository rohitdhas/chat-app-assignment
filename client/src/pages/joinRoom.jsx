/* eslint-disable jsx-a11y/anchor-is-valid */
import Footer from "../components/footer";
import { useState, useRef } from "react";
import { BASE_SERVER_URL } from "../env_vars";
import { useHistory } from "react-router";
import { storeValue } from "../helper/utils";

export default function JoinRoom() {
  const [username, setUsername] = useState("");
  const [room_id, setRoom_id] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const errRef = useRef("");

  async function join_room(e) {
    e.preventDefault();
    if (!username || !room_id || !password) return;
    const response = await fetch(`${BASE_SERVER_URL}/join-room`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, room_id, password }),
    });
    const data = await response.json();

    if (!data.success) {
      errRef.current.innerText = data.message;
      errRef.current.classList.remove("hidden");
    } else {
      storeValue("joined_room", room_id);
      storeValue("username", username);

      history.replace("/");
      history.push(`room/${room_id}`);
    }
  }

  return (
    <div className="h-screen flex align items-center flex-col bg-slate-700">
      <h1 className="text-2xl font-bold text-center mt-8 text-white">
        Join a Room to get started 🎈
      </h1>
      <form
        onSubmit={(e) => join_room(e)}
        className="w-2/6 p-4 border-2 border-slate-400 rounded-lg flex flex-col h-max my-10"
      >
        <div
          id="err_box"
          ref={errRef}
          className="hidden p-2 my-2 text-white font-bold text-center bg-red-400 rounded-md"
        ></div>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
          className="text-white font-bold bg-slate-800 outline-none p-2 rounded-md border-2 border-slate-500 focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Room ID"
          required
          onChange={(e) => setRoom_id(e.target.value)}
          className=" text-white font-bold bg-slate-800 my-2 outline-none p-2 rounded-md border-2 border-slate-500 focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className=" text-white font-bold bg-slate-800 mb-2 outline-none p-2 rounded-md border-2 border-slate-500 focus:border-blue-500"
        />
        <button
          onClick={(e) => join_room(e)}
          type="submit"
          className="flex align items-center justify-center p-2 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer font-bold text-white"
        >
          Join Room
          <i className="bi bi-box-arrow-in-right ml-2"></i>
        </button>
        <p className="text-center font-semibold text-sm text-slate-300 mt-4">
          Don't have a room ID,{" "}
          <a
            className="no-underline text-blue-500 hover:underline hover:text-blue-600"
            href="/create-room"
          >
            Click here
          </a>{" "}
          to create your own room!
        </p>
      </form>
      <Footer />
    </div>
  );
}
