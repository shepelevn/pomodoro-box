import { Action, action } from 'easy-peasy';

export interface DayStats {
  totalTime: number;
  donePomodoroCount: number;
  lastRecordDate: Date | null;
}

export interface WeekStats {
  focusedTime: number;
  unfocusedTime: number;
  pausedTime: number;
  stops: number;
  lastRecordDate: Date;
}

export interface ChartStat {
  totalTime: number;
  createdDate: Date;
}

export interface StatisticsModel {
  dayStats: DayStats;
  weekStatsArray: WeekStats[];
  chartStats: ChartStat[];

  changeDayStats: Action<StatisticsModel, Partial<DayStats>>;

  changeCurrentWeekStats: Action<StatisticsModel, Partial<WeekStats>>;
  addCurrentWeekStatsPausedTime: Action<StatisticsModel>;
  pushNewWeekStat: Action<StatisticsModel>;

  addCurrentChartStatTime: Action<StatisticsModel, number>;
  pushNewChartStat: Action<StatisticsModel>;
}

const initialDayStats = {
  totalTime: 0,
  donePomodoroCount: 0,
  lastRecordDate: null,
};

export const statisticsModel: StatisticsModel = {
  dayStats: initialDayStats,

  weekStatsArray: [],

  chartStats: [],

  changeDayStats: action((state, payload) => {
    state.dayStats = { ...state.dayStats, ...payload };
  }),

  changeCurrentWeekStats: action((state, payload) => {
    const statsArray = state.weekStatsArray;
    const lastIndex = statsArray.length - 1;
    state.weekStatsArray[lastIndex] = {
      ...statsArray[lastIndex],
      ...payload,
    };
  }),

  addCurrentWeekStatsPausedTime: action((state) => {
    const statsArray = state.weekStatsArray;
    const lastIndex = statsArray.length - 1;

    state.weekStatsArray[lastIndex].pausedTime += 1;
  }),

  pushNewWeekStat: action((state) => {
    state.weekStatsArray.push({
      focusedTime: 0,
      unfocusedTime: 0,
      pausedTime: 0,
      stops: 0,
      lastRecordDate: new Date(),
    });
  }),

  addCurrentChartStatTime: action((state, payload) => {
    state.chartStats[state.chartStats.length - 1].totalTime += payload;
  }),

  pushNewChartStat: action((state) => {
    state.chartStats.push({ createdDate: new Date(), totalTime: 0 });
  }),
};
