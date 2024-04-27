import { action, Action } from 'easy-peasy';

import { isSameDay } from 'utils/date/isSameDay';

export interface CurrentDayStatsModel {
  lastRecordDate: Date | null;
  currentDayTasksCount: number;

  incrementCurrentDayTasksCount: Action<CurrentDayStatsModel>;
  checkCurrentDayDate: Action<CurrentDayStatsModel>;
}

export const currentDayStatsModel: CurrentDayStatsModel = {
  lastRecordDate: null,
  currentDayTasksCount: 1,

  incrementCurrentDayTasksCount: action((state) => {
    state.currentDayTasksCount++;
  }),

  checkCurrentDayDate: action((state) => {
    if (!state.lastRecordDate || !isSameDay(state.lastRecordDate, new Date())) {
      state.currentDayTasksCount = 1;
      state.lastRecordDate = new Date();
    }
  }),
};
