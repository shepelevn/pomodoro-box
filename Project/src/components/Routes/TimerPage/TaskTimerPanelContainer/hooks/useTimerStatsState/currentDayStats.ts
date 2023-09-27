import { action, Action } from 'easy-peasy';

export interface CurrentDayStatsModel {
  lastRecordDate: Date;
  currentDayTasksCount: number;

  incrementCurrentDayTasksCount: Action<CurrentDayStatsModel>;
  resetCurrentDayStats: Action<CurrentDayStatsModel>;
}

export const currentDayStats: CurrentDayStatsModel = {
  lastRecordDate: new Date(),
  currentDayTasksCount: 1,

  incrementCurrentDayTasksCount: action((state) => {
    state.currentDayTasksCount++;
  }),

  resetCurrentDayStats: action((state) => {
    state.currentDayTasksCount = 1;
    state.lastRecordDate = new Date();
  }),
};
