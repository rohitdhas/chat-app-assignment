export default function PageNotFound() {
  return (
    <div className="h-screen text-center flex align items-center justify-center bg-slate-700">
      <div className="font-bold bg-slate-800 rounded-md p-4">
        <p className="text-3xl text-red-400 underline mb-1">404 Error!</p>
        <p className="text-xl text-slate-300">
          Page Not Found.{" "}
          <a
            href="/"
            className="no-underline hover:underline text-blue-500 hover:text-blue-500"
          >
            Click Here{" "}
          </a>{" "}
          to go back!
        </p>
      </div>
    </div>
  );
}
