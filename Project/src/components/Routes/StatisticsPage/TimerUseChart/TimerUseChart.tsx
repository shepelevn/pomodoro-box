import React from 'react';

import { Chart, DataItem } from 'components/common-components/Chart';

import formatMinToFullHourString from 'utils/formatTime/formatMinToFullHourString';
import { ChartStat } from 'utils/easyPeasy/statistics';
import { getMonday } from 'utils/date/getMonday';
import { isSameDay } from 'utils/date/isSameDay';
import { isSameWeek } from 'utils/date/isSameWeek';

import styles from './timerusechart.module.scss';

interface TimerUseChartProps {
  chartStats: ChartStat[];
  selectedWeek: number;
}

const ariaNames = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

export function TimerUseChart({
  chartStats,
  selectedWeek,
}: TimerUseChartProps) {
  const data = createChartData(chartStats, selectedWeek);

  const currentDay = new Date().getDay();
  const activeIndex = selectedWeek === 0 ? (currentDay + 6) % 7 : -1;

  return (
    <div className={styles.container}>
      <Chart
        data={data}
        ariaData={createAriaData(ariaNames, data)}
        activeIndex={activeIndex}
      />
    </div>
  );
}

function createAriaData(names: string[], data: DataItem[]) {
  const ariaData = [];

  for (let i = 0; i < data.length; i++) {
    const ariaValue = formatMinToFullHourString(data[i].value);

    ariaData.push({ name: names[i], value: ariaValue });
  }

  return ariaData;
}

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function createChartData(
  chartStats: ChartStat[],
  selectedWeek: number
): DataItem[] {
  const timesArraySeconds = createChartTimesArray(chartStats, selectedWeek);

  const timesArrayMinutes = timesArraySeconds.map((value) =>
    Math.floor(value / 60)
  );

  const chartData = timesArrayMinutes.map((value, index) => ({
    name: dayNames[index],
    value,
  }));

  return chartData;
}

function createChartTimesArray(
  chartStats: ChartStat[],
  selectedWeek: number
): number[] {
  const monday = getMonday(new Date());

  monday.setDate(monday.getDate() - selectedWeek * 7);

  const selectedWeekData: ChartStat[] = [];
  let lastChartIndex = chartStats.length - 1;

  for (let i = lastChartIndex; i >= 0; i--) {
    const chartDate = chartStats[i].createdDate;
    if (chartDate < monday) break;

    if (isSameWeek(monday, chartDate)) {
      selectedWeekData.push(chartStats[i]);
    }
  }

  const date = new Date(monday);
  const selectedData = selectedWeekData.reverse();

  const data = [];

  for (let i = 0; i < 7; i++) {
    if (selectedData[0] && isSameDay(date, selectedData[0].createdDate)) {
      data.push(selectedData.shift()!.totalTime);
    } else {
      data.push(0);
    }

    date.setDate(date.getDate() + 1);
  }

  return data;
}
