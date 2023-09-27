import { action, Action, thunkOn, ThunkOn } from 'easy-peasy';
import { EasyPeasyStoreModel } from './store';
import { TasksModel } from './tasks';

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

  incrementDonePomodoroCount: Action<CurrentTaskStatsModel>;

  onDeleteTask: ThunkOn<CurrentTaskStatsModel, any, EasyPeasyStoreModel>;
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

  incrementDonePomodoroCount: action((state) => {
    state.donePomodoroCount++;
  }),

  onDeleteTask: thunkOn(
    (_, storeActions) => storeActions.tasks.deleteTaskAndCurrent,
    (actions) => {
      actions.changeCurrentTask([undefined, '']);
    }
  ),
};
