import { Action, action } from 'easy-peasy';

export interface Task {
  id: number;
  name: string;
  pomodoroCount: number;
}

export interface TasksModel {
  tasks: Task[];

  addTask: Action<TasksModel, string>;

  changeTask: Action<
    TasksModel,
    { newTaskProperties: Partial<Task>; id: number }
  >;

  changeTaskPomodoroCount: Action<
    TasksModel,
    { pomodoroCount: number; id: number }
  >;

  deleteTask: Action<TasksModel, number>;

  deleteTaskAndCurrent: Action<TasksModel, number>;

  moveTask: Action<TasksModel, { id: number; direction: 'up' | 'down' }>;
}

export const tasksModel: TasksModel = {
  tasks: [],

  addTask: action((state, payload) => {
    state.tasks.push({
      name: payload,
      pomodoroCount: 1,
      id: generateNewId(state.tasks),
    });
  }),

  changeTask: action((state, { newTaskProperties, id }) => {
    const index = state.tasks.findIndex((task) => task.id === id);

    state.tasks[index] = { ...state.tasks[index], ...newTaskProperties };
  }),

  changeTaskPomodoroCount: action((state, { pomodoroCount, id }) => {
    const index = state.tasks.findIndex((task) => task.id === id);

    state.tasks[index].pomodoroCount = pomodoroCount;
  }),

  deleteTask: action((state, id) => {
    state.tasks = state.tasks.filter((task) => task.id !== id);
  }),

  deleteTaskAndCurrent: action((state, id) => {
    state.tasks = state.tasks.filter((task) => task.id !== id);
  }),

  moveTask: action((state, { id, direction }) => {
    const index = state.tasks.findIndex((value) => value.id === id);
    const newIndex = index + (direction === 'down' ? 1 : -1);

    if (newIndex >= 0 && newIndex < state.tasks.length) {
      const temp = state.tasks[index];
      state.tasks[index] = state.tasks[newIndex];
      state.tasks[newIndex] = temp;
    }
  }),
};

function generateNewId(tasks: Task[]): number {
  const maxId = tasks.reduce<number>(
    (accumulator, currentTask) =>
      currentTask.id > accumulator ? currentTask.id : accumulator,
    0
  );

  return maxId + 1;
}
