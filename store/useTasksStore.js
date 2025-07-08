import { create } from "zustand";
import dummyTasks from "../constants/dummyTasks";

const useTasksStore = create((set) => ({
  tasks: dummyTasks,
  timers: {},
  intervals: {},

  setTasks: (newTasks) => set({ tasks: newTasks }),

  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      ),
    })),

  startTimer: (taskId) =>
    set((state) => {
      if (state.intervals[taskId]) return state;
      const interval = setInterval(() => {
        set((s) => {
          const task = s.tasks.find((t) => t._id === taskId);
          if (
            !task ||
            task.status === "completed" ||
            task.status === "paused"
          ) {
            clearInterval(s.intervals[taskId]);
            return {
              intervals: { ...s.intervals, [taskId]: null },
            };
          }
          const newTimeSpent = (task.timeSpent || 0) + 1;
          const estimatedSeconds =
            (task.estimatedDuration || task.duration) * 60;
          const newStatus =
            newTimeSpent > estimatedSeconds &&
            task.status !== "completed" &&
            task.status !== "overdue"
              ? "overdue"
              : task.status;
          return {
            tasks: s.tasks.map((t) =>
              t._id === taskId
                ? { ...t, timeSpent: newTimeSpent, status: newStatus }
                : t
            ),
            timers: { ...s.timers, [taskId]: newTimeSpent },
          };
        });
      }, 1000);
      return {
        intervals: { ...state.intervals, [taskId]: interval },
        timers: {
          ...state.timers,
          [taskId]: state.tasks.find((t) => t._id === taskId).timeSpent || 0,
        },
      };
    }),

  pauseTimer: (taskId) =>
    set((state) => {
      if (state.intervals[taskId]) {
        clearInterval(state.intervals[taskId]);
      }
      return {
        intervals: { ...state.intervals, [taskId]: null },
      };
    }),

  stopTimer: (taskId) =>
    set((state) => {
      if (state.intervals[taskId]) {
        clearInterval(state.intervals[taskId]);
      }
      return {
        intervals: { ...state.intervals, [taskId]: null },
      };
    }),

  getTimer: (taskId) => (state) => state.timers[taskId] || 0,
}));

export default useTasksStore;
