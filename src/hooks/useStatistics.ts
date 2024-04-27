import { createTypedHooks } from 'easy-peasy';
import { useEffect, useRef } from 'react';

import { EasyPeasyStoreModel } from 'utils/easyPeasy/store';
import { isSameDay } from 'utils/date/isSameDay';

const { useStoreState, useStoreActions } =
  createTypedHooks<EasyPeasyStoreModel>();

export function useStatistics() {
  const { dayStats, chartStats } = useStoreState((state) => state.statistics);
  const {
    changeDayStats,
    incrementPausedTimeState,
    addCurrentChartStatTime,
    pushNewChartStat,
  } = useStoreActions((actions) => actions.statistics);

  const checkedDatesRef = useRef(false);
  useEffect(() => {
    if (!checkedDatesRef.current) {
      checkStatisticsDataDates();

      checkedDatesRef.current = true;
    }
  }, []);

  return {
    dayStats,
    chartStats,
    addCurrentDayStatTotalTime,
    addCurrentDayStatPomodoro,
    addFocusedTime,
    addUnfocusedTime,
    addPausedTime,
    addStop,
    addChartTime,
  };

  function addCurrentDayStatTotalTime(time: number) {
    changeDayStats({ totalTime: dayStats.totalTime + time });
  }

  function addCurrentDayStatPomodoro() {
    changeDayStats({ donePomodoroCount: dayStats.donePomodoroCount + 1 });
  }

  function addFocusedTime(time: number) {
    changeDayStats({
      focusedTime: dayStats.focusedTime + time,
    });
  }

  function addUnfocusedTime(time: number) {
    changeDayStats({
      unfocusedTime: dayStats.unfocusedTime + time,
    });
  }

  function addPausedTime() {
    incrementPausedTimeState();
  }

  function addStop() {
    changeDayStats({
      stops: dayStats.stops + 1,
    });
  }

  function addChartTime(time: number) {
    addCurrentChartStatTime(time);
  }

  function checkStatisticsDataDates(): void {
    const now = new Date();

    if (!dayStats.lastRecordDate || !isSameDay(now, dayStats.lastRecordDate)) {
      changeDayStats({
        totalTime: 0,
        donePomodoroCount: 0,
        focusedTime: 0,
        unfocusedTime: 0,
        pausedTime: 0,
        stops: 0,
        lastRecordDate: new Date(),
      });
    }

    const chartStatDate = chartStats[chartStats.length - 1]?.createdDate;
    if (!chartStatDate || !isSameDay(now, chartStatDate)) {
      pushNewChartStat();
    }
  }
}
