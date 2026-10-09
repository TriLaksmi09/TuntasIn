import Sidebar from "../komponen/Sidebar";
import { useContext } from "react";
import { TaskContext } from "../Context/TaskContext";

export default function TaskDetail() {
  const { tasks } = useContext(TaskContext);

  const hitungDeadline = (tanggal, jam) => {
    if (!tanggal) return 0;

    const sekarang = new Date();
    const deadline = new Date(`${tanggal}T${jam || "23:59"}:00`);

    const selisih = deadline - sekarang;

    return Math.ceil(
      selisih / (1000 * 60 * 60 * 24)
    );
  };

  const getDeadlineStyle = (sisaHari) => {
    if (sisaHari < 0) {
      return {
        warna: "bg-gray-100 text-gray-600",
        border: "border-gray-300",
        label: "Terlambat",
      };
    }

    if (sisaHari <= 2) {
      return {
        warna: "bg-red-100 text-red-600",
        border: "border-red-200",
        label: "Mendesak",
      };
    }

    if (sisaHari <= 5) {
      return {
        warna: "bg-yellow-100 text-yellow-700",
        border: "border-yellow-200",
        label: "Segera",
      };
    }

    return {
      warna: "bg-green-100 text-green-700",
      border: "border-green-200",
      label: "Masih Aman",
    };
  };

  const getSisaWaktuText = (sisaHari) => {
    if (sisaHari < 0) {
      return "Deadline Terlewat";
    }

    if (sisaHari === 0) {
      return "Hari Ini";
    }

    if (sisaHari === 1) {
      return "Besok";
    }

    return `${sisaHari} Hari Lagi`;
  };

  const tugasAktif = tasks.filter(
    (item) => item.status !== "Selesai"
  );

  return (
    <div className="flex min-h-screen bg-[#F5F7F2]">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#5F7A61]">
            Deadline Tugas
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Pantau tugas yang mendekati batas waktu pengumpulan.
          </p>
        </div>

        <div className="space-y-5">
          {tugasAktif.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <p className="text-gray-500">
                Tidak ada tugas yang perlu dipantau.
              </p>
            </div>
          ) : (
            tugasAktif.map((item) => {
              const sisaHari = hitungDeadline(
                item.tanggal,
                item.jam
              );

              const style = getDeadlineStyle(
                sisaHari
              );

              return (
                <div
                  key={item.id}
                  className={`bg-white p-6 rounded-2xl shadow-sm border ${style.border}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-[#2F3E34]">
                        {item.matkul}
                      </h2>

                      <p className="text-gray-600 mt-1">
                        {item.judul}
                      </p>

                      <p className="text-gray-500 mt-2">
                        {item.keterangan}
                      </p>

                      <div className="flex gap-6 mt-4 text-sm text-gray-500">
                        <p>
                          Tanggal: {item.tanggal}
                        </p>

                        <p>
                          Waktu: {item.jam}
                        </p>
                      </div>

                      <div className="mt-4">
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
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-4 py-2 rounded-full font-semibold ${style.warna}`}
                      >
                        {style.label}
                      </span>

                      <p className="mt-3 font-semibold text-gray-600">
                        {getSisaWaktuText(
                          sisaHari
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}