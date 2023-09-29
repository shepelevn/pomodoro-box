import React from 'react';

import { ReactComponent as TargetSvg } from './svg/target.svg';
import { ReactComponent as ClockSvg } from './svg/clock.svg';
import { ReactComponent as StopSvg } from './svg/stop.svg';

import { WeekStats } from 'utils/easyPeasy/statistics';
import { StatBox } from './StatBox';

import styles from './userstats.module.scss';
import formatMinToShortHourString from 'utils/formatTime/formatMinToShortHourString';

interface UserStatsProps {
  statsArray: WeekStats[];
  selectedWeek: number;
}

export function UserStats({ statsArray, selectedWeek }: UserStatsProps) {
  const uncheckedStats = statsArray[selectedWeek];
  const stats: WeekStats = uncheckedStats || {
    focusedTime: 0,
    unfocusedTime: 0,
    pausedTime: 0,
    stops: 0,
  };

  const focusPercentage = getFocusPercentage(
    stats.focusedTime,
    stats.unfocusedTime
  );

  const pausedTimeString = formatMinToShortHourString(
    Math.floor(stats.pausedTime / 60)
  );

  return (
    <div className={styles.container}>
      <StatBox
        className={`${styles.box} ${styles.focus}`}
        title="Фокус"
        value={`${focusPercentage}%`}
        IconComponent={TargetSvg}
      />
      <StatBox
        className={`${styles.box} ${styles.pausedTime}`}
        title="Время на паузе"
        value={pausedTimeString}
        IconComponent={ClockSvg}
      />
      <StatBox
        className={`${styles.box} ${styles.stops}`}
        valueClassName={styles.stopsValue}
        title="Остановки"
        value={stats.stops.toString()}
        IconComponent={StopSvg}
      />
    </div>
  );
}

function getFocusPercentage(focusedTime: number, unfocusedTime: number) {
  if (!focusedTime) return 0;
  if (focusedTime === 0) return 0;
  if (unfocusedTime === 0) return 100;
  return Math.round((focusedTime / (focusedTime + unfocusedTime)) * 100);
}
