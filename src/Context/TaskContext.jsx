
import { createContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Menandai tugas selesai
  const selesaiTugas = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: "Selesai" }
          : task
      )
    );
  };

  // Mengedit tugas
  const editTugas = (id, dataBaru) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, ...dataBaru, id: task.id }
          : task
      )
    );
  };

  // Menghapus tugas
  const hapusTugas = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        selesaiTugas,
        editTugas,
        hapusTugas,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}