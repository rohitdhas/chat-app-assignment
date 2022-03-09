export default function Sidebar({ users }) {
  return (
    <div className="h-full overflow-auto styled-scrollbar w-1/5 flex flex-col align items-center rounded-md p-4 border-2 border-slate-500">
      <p className="font-bold text-white border-b-2 pb-2 mb-2 border-b-blue-400">
        Connected Users
        <i className="bi bi-person-fill ml-1"></i>
      </p>
      {users &&
        users.map((user, idx) => {
          return <UserCard key={`${user}_${idx}`} username={user} />;
        })}
    </div>
  );
}

function UserCard({ username }) {
  return (
    <div className="hover:bg-slate-800 bg-slate-600 px-4 py-2 rounded-md mb-2 font-bold text-white w-full flex align items-center">
      <i className="bi bi-person-circle mr-2 text-4xl"></i>
      <span>{username}</span>
    </div>
  );
}
