import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuClass = (path) =>
    location.pathname === path
      ? "flex items-center gap-3 bg-[#EEF4EE] text-[#5F7A61] px-4 py-3 rounded-xl font-medium"
      : "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100";

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-5">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#5F7A61]">
          TuntasIn
        </h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3 text-xl font-[Averia]">

        <Link to="/" className={menuClass("/")}>
          Dashboard
        </Link>

        <Link to="/task-list" className={menuClass("/task-list")}>
          Daftar Tugas
        </Link>

        <Link to="/add-task" className={menuClass("/add-task")}>
          Tambah Tugas
        </Link>

        <Link to="/task-detail" className={menuClass("/task-detail")}>
          Deadline
        </Link>

      </div>
    </div>
  );
}