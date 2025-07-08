import { create } from "zustand";
import dummyTasks from "../constants/dummyTasks";

const useTasksStore = create((set) => ({
  tasks: dummyTasks,

  setTasks: (newTasks) => set({ tasks: newTasks }),

  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      ),
    })),
}));

export default useTasksStore;
