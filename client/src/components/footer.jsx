/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Footer() {
  return (
    <footer className="mt-auto mb-2 font-bold text-slate-300 text-center text-xs bg-slate-800 px-8 py-4 rounded-md">
      <p>
        <span className="text-blue-400 underline">React ⚛</span> on the
        Frontend, <span className="text-green-400 underline">Node</span> +
        <span className="text-gray-500 underline"> Socket.io</span> on the
        backend, & Hosted on <span className="text-purple-300">Heroku 🚀</span>
      </p>
      <p className="mt-1">
        Built with
        <i className="bi bi-heart-fill text-red-500 mx-2"></i>
        by{" "}
        <a
          href="https://www.linkedin.com/in/rohit-dhas-26b68215a/"
          className="text-blue-300 hover:underline hover:text-blue-500"
          target="_blank"
          rel="noreferrer"
        >
          Rohit Dhas
        </a>
      </p>
    </footer>
  );
}
