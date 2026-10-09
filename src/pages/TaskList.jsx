import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../komponen/Sidebar";
import { TaskContext } from "../Context/TaskContext";

export default function TaskList() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const { tasks, setTasks, hapusTugas } = useContext(TaskContext);

  const hitungSisaHari = (tanggal) => {
    if (!tanggal) return 0;

    const sekarang = new Date();
    const deadline = new Date(tanggal);

    return Math.ceil(
      (deadline - sekarang) / (1000 * 60 * 60 * 24)
    );
  };

  const tandaiSelesai = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id
          ? { ...item, status: "Selesai" }
          : item
      )
    );
  };

  const handleHapus = (item) => {
    const yakin = window.confirm(
      `Yakin ingin menghapus tugas "${item.judul}"?`
    );

    if (yakin) {
      hapusTugas(item.id);
    }
  };

  const filteredTasks = tasks.filter((item) => {
    const cocokStatus =
      filter === "Semua" || item.status === filter;

    const kataKunci = search.toLowerCase();

    const cocokSearch =
      (item.matkul || "").toLowerCase().includes(kataKunci) ||
      (item.judul || "").toLowerCase().includes(kataKunci);

    return cocokStatus && cocokSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#F5F7F2]">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h1 className="text-5xl font-bold text-[#5F7A61]">
            Daftar Tugas
          </h1>

          <Link
            to="/add-task"
            className="bg-[#5F7A61] text-white px-6 py-3 rounded-xl hover:bg-[#4d6650] transition"
          >
            + Tambah Tugas
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Cari tugas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-4 py-3 rounded-xl border border-gray-300 bg-white mb-6"
        />

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["Semua", "Pending", "Selesai"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === status
                  ? status === "Pending"
                    ? "bg-yellow-500 text-white"
                    : status === "Selesai"
                    ? "bg-green-500 text-white"
                    : "bg-[#5F7A61] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Card Tugas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-500 text-center">
                {search || filter !== "Semua"
                  ? "Tugas tidak ditemukan."
                  : "Belum ada tugas."}
              </p>
            </div>
          ) : (
            filteredTasks.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {item.matkul}
                </h2>

                <p className="text-gray-600 mb-4">
                  {item.judul}
                </p>

                <div className="space-y-2 mb-5">
                  <p className="text-gray-500">
                    Tanggal: {item.tanggal}
                  </p>

                  <p className="text-gray-500">
                    Waktu: {item.jam}
                  </p>

                  <p
                    className={`font-semibold ${
                      hitungSisaHari(item.tanggal) <= 1
                        ? "text-red-500"
                        : hitungSisaHari(item.tanggal) <= 3
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    Sisa Hari: {hitungSisaHari(item.tanggal)} Hari Lagi
                  </p>
                </div>

                {/* Prioritas */}
                <div className="mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.prioritas === "Tinggi"
                        ? "bg-red-100 text-red-700"
                        : item.prioritas === "Sedang"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.prioritas}
                  </span>
                </div>

                {/* Status */}
                <div className="mb-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === "Selesai"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-wrap gap-3">
                  {item.status === "Pending" ? (
                    <button
                      onClick={() => tandaiSelesai(item.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                    >
                      ✓ Tandai Selesai
                    </button>
                  ) : (
                    <div className="text-green-600 font-medium py-2">
                      ✓ Tugas sudah dikumpulkan
                    </div>
                  )}

                  {/* Tombol Edit */}
                  <Link
                    to={`/edit-tugas/${item.id}`}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition"
                  >
                    Edit
                  </Link>

                  {/* Tombol Hapus */}
                  <button
                    onClick={() => handleHapus(item)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}