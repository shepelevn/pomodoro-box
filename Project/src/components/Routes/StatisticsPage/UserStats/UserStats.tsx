import React from 'react';

import { ReactComponent as TargetSvg } from './svg/target.svg';
import { ReactComponent as ClockSvg } from './svg/clock.svg';
import { ReactComponent as StopSvg } from './svg/stop.svg';

import formatMinToShortHourString from 'utils/formatTime/formatMinToShortHourString';
import { DayStats } from 'utils/easyPeasy/statistics';
import { StatBox } from './StatBox';

import styles from './userstats.module.scss';

interface UserStatsProps {
  stats: DayStats;
}

export function UserStats({ stats }: UserStatsProps) {
  const isBoxActive = stats.totalTime !== 0;

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
        className={`${styles.box} ${styles.focus} ${
          isBoxActive || styles.disabled
        }`}
        title="Фокус"
        value={`${focusPercentage}%`}
        IconComponent={TargetSvg}
      />
      <StatBox
        className={`${styles.box} ${styles.pausedTime} ${
          isBoxActive || styles.disabled
        }`}
        title="Время на паузе"
        value={pausedTimeString}
        IconComponent={ClockSvg}
      />
      <StatBox
        className={`${styles.box} ${styles.stops} ${
          isBoxActive || styles.disabled
        }`}
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
