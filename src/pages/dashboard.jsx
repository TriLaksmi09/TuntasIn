
import { useContext, useState } from "react";
import { TaskContext } from "../Context/TaskContext";
import Sidebar from "../komponen/Sidebar";
import StateCard from "../komponen/StateCard";

export default function Dashboard() {
  const { tasks } = useContext(TaskContext);
  const [search, setSearch] = useState("");

  // Statistik seluruh tugas
  const totalTugas = tasks.length;

  const tugasSelesai = tasks.filter(
    (item) => item.status === "Selesai"
  ).length;

  const tugasPending = tasks.filter(
    (item) => item.status !== "Selesai"
  ).length;

  // Hitung sisa hari
  const hitungSisaHari = (tanggal) => {
    if (!tanggal) return 0;

    const sekarang = new Date();
    const deadline = new Date(tanggal);

    return Math.ceil(
      (deadline - sekarang) / (1000 * 60 * 60 * 24)
    );
  };

  // Cari berdasarkan mata kuliah atau judul tugas
  const keyword = search.trim().toLowerCase();

  const hasilPencarian = tasks.filter((item) => {
    return (
      (item.matkul || "").toLowerCase().includes(keyword) ||
      (item.judul || "").toLowerCase().includes(keyword)
    );
  });

  // Urutkan deadline terdekat dari hasil pencarian
  const deadlineTerdekat = [...hasilPencarian]
    .sort(
      (a, b) =>
        hitungSisaHari(a.tanggal) -
        hitungSisaHari(b.tanggal)
    )
    .slice(0, 3);

  return (
    <div className="flex min-h-screen bg-[#F5F7F2]">
      <Sidebar />

      <main className="flex-1 min-w-0 p-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-5 mb-8">
          <div>
            <h1 className="text-5xl font-bold text-[#5F7A61]">
              Halo!
            </h1>

            <p className="text-gray-500 mt-2 text-xl">
              Sudah siap untuk hari ini lebih produktif?
            </p>
          </div>

          <input
            type="text"
            placeholder="Cari mata kuliah atau judul tugas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#5F7A61]"
          />
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StateCard
            title="Total Tugas"
            value={totalTugas}
            color="text-black"
          />

          <StateCard
            title="Selesai"
            value={tugasSelesai}
            color="text-green-600"
          />

          <StateCard
            title="Pending"
            value={tugasPending}
            color="text-yellow-500"
          />
        </div>

        {/* Deadline Terdekat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Deadline Terdekat
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-400">
              Belum ada tugas. Yuk, tambahkan tugas pertamamu!
            </p>
          ) : deadlineTerdekat.length === 0 ? (
            <p className="text-gray-400">
              Tugas yang kamu cari tidak ditemukan.
            </p>
          ) : (
            deadlineTerdekat.map((item) => (
              <div
                key={item.id}
                className="border-b py-4 last:border-b-0"
              >
                <h3 className="font-semibold text-lg">
                  {item.matkul}
                </h3>

                <p className="text-gray-500">
                  {item.judul}
                </p>

                <div className="flex flex-wrap justify-between gap-2 mt-2">
                  <p className="text-gray-400 text-sm">
                    Tanggal: {item.tanggal}
                  </p>

                  <span className="font-semibold text-yellow-500">
                    {hitungSisaHari(item.tanggal) < 0
                      ? "Deadline terlewat"
                      : hitungSisaHari(item.tanggal) === 0
                      ? "Deadline hari ini"
                      : `${hitungSisaHari(item.tanggal)} hari lagi`}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}