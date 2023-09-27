import { createStore, persist } from 'easy-peasy';

import { currentTaskStats, CurrentTaskStatsModel } from './currentTaskStats';
import { StatisticsModel, statisticsModel } from './statistics';
import { TasksModel, tasksModel } from './tasks';

export interface EasyPeasyStoreModel {
  tasks: TasksModel;
  currentTask: CurrentTaskStatsModel;
  statistics: StatisticsModel;
}

export const easyPeasyStore = createStore<EasyPeasyStoreModel>(
  persist({
    tasks: tasksModel,
    currentTask: currentTaskStats,
    statistics: statisticsModel,
  }),
  { version: 18 }
);
