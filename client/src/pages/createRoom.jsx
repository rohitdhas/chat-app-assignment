/* eslint-disable jsx-a11y/anchor-is-valid */
import Footer from "../components/footer";

export default function CreateRoom() {
  return (
    <div className="h-screen flex align items-center flex-col bg-slate-700">
      <h1 className="text-2xl font-bold text-center mt-8 text-white">
        Create a new Chat Room ✨
      </h1>
      <form className="w-2/6 p-4 border-2 border-slate-400 rounded-lg flex flex-col h-max my-10">
        <div
          id="err_box"
          className="hidden p-2 my-2 text-white font-bold text-center bg-red-400 rounded-md"
        >
          Invalid Room ID ❌
        </div>
        <input
          type="text"
          placeholder="Room Name"
          className="text-white font-bold bg-slate-800 outline-none p-2 rounded-md border-2 border-slate-500 focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className=" text-white font-bold bg-slate-800 my-2 outline-none p-2 rounded-md border-2 border-slate-500 focus:border-blue-500"
        />
        <button className="flex align items-center justify-center p-2 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer font-bold text-white">
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
