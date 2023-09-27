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
};

function generateNewId(tasks: Task[]): number {
  const maxId = tasks.reduce<number>(
    (accumulator, currentTask) =>
      currentTask.id > accumulator ? currentTask.id : accumulator,
    0
  );

  return maxId + 1;
}
