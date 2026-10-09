import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import DaftarTugas from "./pages/TaskList";
import DetailTugas from "./pages/TaskDetail";
import TambahTugas from "./pages/AddTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task-list" element={<DaftarTugas />} />
        <Route path="/task-detail" element={<DetailTugas />} />
        <Route path="/add-task" element={<TambahTugas />} />
        <Route path="/edit-tugas/:id" element={<TambahTugas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;