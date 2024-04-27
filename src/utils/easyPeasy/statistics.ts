import { Action, action } from 'easy-peasy';

export interface DayStats {
  totalTime: number;
  donePomodoroCount: number;
  focusedTime: number;
  unfocusedTime: number;
  pausedTime: number;
  stops: number;
  lastRecordDate: Date | null;
}

export interface ChartStat {
  totalTime: number;
  createdDate: Date;
}

export interface StatisticsModel {
  dayStats: DayStats;
  chartStats: ChartStat[];

  changeDayStats: Action<StatisticsModel, Partial<DayStats>>;
  incrementPausedTimeState: Action<StatisticsModel>;

  addCurrentChartStatTime: Action<StatisticsModel, number>;
  pushNewChartStat: Action<StatisticsModel>;
}

const initialDayStats = {
  totalTime: 0,
  donePomodoroCount: 0,
  focusedTime: 0,
  unfocusedTime: 0,
  pausedTime: 0,
  stops: 0,
  lastRecordDate: null,
};

export const statisticsModel: StatisticsModel = {
  dayStats: initialDayStats,

  chartStats: [],

  changeDayStats: action((state, payload) => {
    state.dayStats = { ...state.dayStats, ...payload };
  }),

  incrementPausedTimeState: action((state) => {
    state.dayStats.pausedTime += 1;
  }),

  addCurrentChartStatTime: action((state, payload) => {
    state.chartStats[state.chartStats.length - 1].totalTime += payload;
  }),

  pushNewChartStat: action((state) => {
    state.chartStats.push({ createdDate: new Date(), totalTime: 0 });
  }),
};
