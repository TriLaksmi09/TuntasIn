import Sidebar from "../komponen/Sidebar";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../Context/TaskContext";

export default function AddTask() {
  const { tasks, setTasks, editTugas } = useContext(TaskContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const tugasDipilih = tasks.find(
    (task) => String(task.id) === id
  );

  const [matkul, setMatkul] = useState("");
  const [judul, setJudul] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [prioritas, setPrioritas] = useState("Sedang");

  // Mengisi form dengan data tugas yang akan diedit
  useEffect(() => {
    if (isEdit && tugasDipilih) {
      setMatkul(tugasDipilih.matkul || "");
      setJudul(tugasDipilih.judul || "");
      setKeterangan(tugasDipilih.keterangan || "");
      setTanggal(tugasDipilih.tanggal || "");
      setJam(tugasDipilih.jam || "");
      setPrioritas(tugasDipilih.prioritas || "Sedang");
    }
  }, [id, isEdit, tugasDipilih]);

  const handleSubmit = () => {
    if (
      !matkul.trim() ||
      !judul.trim() ||
      !keterangan.trim() ||
      !tanggal ||
      !jam
    ) {
      alert("Lengkapi semua data terlebih dahulu!");
      return;
    }

    const dataTugas = {
      matkul: matkul.trim(),
      judul: judul.trim(),
      keterangan: keterangan.trim(),
      tanggal,
      jam,
      prioritas,
    };

    // MODE EDIT
    if (isEdit) {
      if (!tugasDipilih) {
        alert("Tugas tidak ditemukan!");
        return;
      }

      if (typeof editTugas !== "function") {
        alert(
          "Fungsi editTugas belum tersedia di TaskContext.jsx."
        );
        return;
      }

      // Mempertahankan ID dan status tugas sebelumnya
      editTugas(tugasDipilih.id, dataTugas);

      alert("Tugas berhasil diperbarui!");

      // Kembali ke halaman sebelumnya
      navigate(-1);
      return;
    }

    // MODE TAMBAH
    const tugasBaru = {
      id: Date.now(),
      ...dataTugas,
      status: "Pending",
    };

    setTasks((prevTasks) => [...prevTasks, tugasBaru]);

    alert("Tugas berhasil ditambahkan!");

    setMatkul("");
    setJudul("");
    setKeterangan("");
    setTanggal("");
    setJam("");
    setPrioritas("Sedang");
  };

  // Jika URL edit tidak cocok dengan tugas mana pun
  if (isEdit && !tugasDipilih) {
    return (
      <div className="flex min-h-screen bg-[#F5F7F2]">
        <Sidebar />

        <div className="flex-1 p-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h1 className="text-3xl font-bold text-[#5F7A61]">
              Tugas Tidak Ditemukan
            </h1>

            <p className="mt-3 text-gray-600">
              Tugas yang ingin kamu edit tidak tersedia.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 bg-[#5F7A61] text-white px-5 py-3 rounded-xl hover:bg-[#4f6951]"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F7F2]">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* FORM */}
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h1 className="text-4xl font-bold text-[#5F7A61] mb-8">
              {isEdit ? " Edit Tugas" : "+ Tambahkan Tugas Baru"}
            </h1>

            <div className="space-y-5">
              <div>
                <label className="font-semibold">
                  Mata Kuliah
                </label>

                <input
                  type="text"
                  value={matkul}
                  onChange={(e) => setMatkul(e.target.value)}
                  placeholder="Contoh: Teknologi Web"
                  className="w-full p-3 mt-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold">
                  Judul Tugas
                </label>

                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Membuat Dashboard React"
                  className="w-full p-3 mt-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold">
                  Keterangan
                </label>

                <textarea
                  rows="4"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder="Masukkan keterangan tugas"
                  className="w-full p-3 mt-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">
                    Deadline
                  </label>

                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full p-3 mt-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Jam Tenggat
                  </label>

                  <input
                    type="time"
                    value={jam}
                    onChange={(e) => setJam(e.target.value)}
                    className="w-full p-3 mt-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-3">
                  Prioritas
                </label>

                <select
                  value={prioritas}
                  onChange={(e) => setPrioritas(e.target.value)}
                  className="w-full p-3 border rounded-xl"
                >
                  <option>Rendah</option>
                  <option>Sedang</option>
                  <option>Tinggi</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#5F7A61] text-white py-4 rounded-xl font-semibold hover:bg-[#4f6951] transition"
              >
                {isEdit ? "Simpan Perubahan" : "Simpan Tugas"}
              </button>

              {isEdit && (
                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Batal
                </button>
              )}
            </div>
          </div>

          {/* PREVIEW */}
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#5F7A61]">
              Preview Tugas
            </h2>

            {!matkul && !judul && !keterangan && !tanggal && !jam ? (
              <div className="h-[350px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
                Preview tugas akan muncul di sini
              </div>
            ) : (
              <div className="border-l-4 border-[#5F7A61] bg-[#F5F7F2] p-6 rounded-xl">
                <h3 className="text-2xl font-bold">
                  Mata Kuliah: {matkul}
                </h3>

                <p className="mt-4 text-lg">
                  Judul Tugas: {judul}
                </p>

                <p className="mt-4 text-gray-600">
                  {keterangan}
                </p>

                <div className="mt-5 space-y-2">
                  <p>Tanggal: {tanggal}</p>
                  <p>Waktu: {jam}</p>
                </div>

                <div className="mt-5">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      prioritas === "Tinggi"
                        ? "bg-red-100 text-red-600"
                        : prioritas === "Sedang"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {prioritas}
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}