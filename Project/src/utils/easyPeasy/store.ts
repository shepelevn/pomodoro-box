import { createStore, persist } from 'easy-peasy';

import { currentTaskStats, CurrentTaskStatsModel } from './currentTaskStats';
import { StatisticsModel, statisticsModel } from './statistics';
import { TasksModel, tasksModel } from './tasks';
import { currentDayStatsModel, CurrentDayStatsModel } from './currentDayStats';

export interface EasyPeasyStoreModel {
  tasks: TasksModel;
  currentTask: CurrentTaskStatsModel;
  statistics: StatisticsModel;
  currentDayStats: CurrentDayStatsModel;
}

export const easyPeasyStore = createStore<EasyPeasyStoreModel>(
  persist({
    tasks: tasksModel,
    currentTask: currentTaskStats,
    statistics: statisticsModel,
    currentDayStats: currentDayStatsModel,
  }),
  { version: 7 }
);
