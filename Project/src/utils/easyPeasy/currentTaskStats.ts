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

  incrementDonePomodoroCount: action((state) => {
    state.donePomodoroCount++;
  }),

  onCurrentTaskChange: thunkOn(
    (_, storeActions) => [
      storeActions.tasks.deleteTaskAndCurrent,
      storeActions.tasks.moveTask,
    ],
    (actions, _, { getStoreState }) => {
      actions.changeCurrentTask([undefined, '']);
    }
  ),
};
