import { createTypedHooks } from 'easy-peasy';
import { useEffect, useRef, useState } from 'react';

import { EasyPeasyStoreModel } from 'utils/easyPeasy/store';
import { isSameDay } from 'utils/date/isSameDay';
import { isSameWeek } from 'utils/date/isSameWeek';

const { useStoreState, useStoreActions } =
  createTypedHooks<EasyPeasyStoreModel>();

export function useStatistics() {
  const { dayStats, weekStatsArray, chartStats } = useStoreState(
    (state) => state.statistics
  );
  const {
    changeDayStats,
    changeCurrentWeekStats,
    addCurrentWeekStatsPausedTime,
    pushNewWeekStat,
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
    const lastIndex = weekStatsArray.length - 1;

    changeCurrentWeekStats({
      focusedTime: weekStatsArray[lastIndex].focusedTime + time,
    });
  }

  function addUnfocusedTime(time: number) {
    const lastIndex = weekStatsArray.length - 1;

    changeCurrentWeekStats({
      unfocusedTime: weekStatsArray[lastIndex].unfocusedTime + time,
    });
  }

  function addPausedTime() {
    addCurrentWeekStatsPausedTime();
  }

  function addStop() {
    const lastIndex = weekStatsArray.length - 1;

    changeCurrentWeekStats({
      stops: weekStatsArray[lastIndex].stops + 1,
    });
  }

  function addChartTime(time: number) {
    addCurrentChartStatTime(time);
  }

  function checkStatisticsDataDates(): void {
    const now = new Date();

    if (!isSameDay(now, dayStats.lastRecordDate)) {
      changeDayStats({
        totalTime: 0,
        donePomodoroCount: 0,
        lastRecordDate: now,
      });
    }

    const weekStatsDate =
      weekStatsArray[weekStatsArray.length - 1]?.lastRecordDate;
    if (!weekStatsDate || !isSameWeek(now, weekStatsDate)) {
      pushNewWeekStat();
    }

    const chartStatDate = chartStats[chartStats.length - 1]?.createdDate;
    if (!chartStatDate || !isSameDay(now, chartStatDate)) {
      pushNewChartStat();
    }
  }
}
