import { action, Action, thunkOn, ThunkOn } from 'easy-peasy';
import { EasyPeasyStoreModel } from './store';

export interface CurrentTaskData {
  taskId: number | undefined;
  taskName: string;
  donePomodoroCount: number;
}

export interface CurrentTaskStatsModel extends CurrentTaskData {
  changeCurrentTask: Action<
    CurrentTaskStatsModel,
    [id: number | undefined, name: string]
  >;

  changeCurrentTaskName: Action<CurrentTaskStatsModel, string>;

  incrementDonePomodoroCount: Action<CurrentTaskStatsModel>;

  onCurrentTaskChange: ThunkOn<CurrentTaskStatsModel, any, EasyPeasyStoreModel>;
}

export const currentTaskStats: CurrentTaskStatsModel = {
  taskId: undefined,
  taskName: '',
  donePomodoroCount: 1,

  changeCurrentTask: action((state, [id, name]) => {
    state.taskId = id;
    state.taskName = name;
    state.donePomodoroCount = 1;
  }),

  changeCurrentTaskName: action((state, name) => {
    state.taskName = name;
  }),

  incrementDonePomodoroCount: action((state) => {
    state.donePomodoroCount++;
  }),

  onCurrentTaskChange: thunkOn(
    (_, storeActions) => [
      storeActions.tasks.deleteTaskAndCurrent,
      storeActions.tasks.moveTask,
    ],
    (actions, _, { getState, getStoreState }) => {
      const currentTask = getState();
      const tasks = getStoreState().tasks.tasks;

      if (!tasks[0]) actions.changeCurrentTask([undefined, '']);
      else if (currentTask.taskId !== tasks[0].id)
        actions.changeCurrentTask([tasks[0]?.id || undefined, tasks[0].name]);
    }
  ),
};
