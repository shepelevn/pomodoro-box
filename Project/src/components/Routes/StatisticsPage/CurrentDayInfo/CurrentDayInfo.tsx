import React from 'react';

import { CurrentDayTotalTime } from './CurrentDayTotalTime';
import { CurrentDayPomodoroCount } from './CurrentDayPomodoroCount';

import styles from './currentdayinfo.module.scss';
import { DayStats } from 'utils/easyPeasy/statistics';

interface CurrentDayInfoProps {
  dayStats: DayStats;
}

export function CurrentDayInfo({ dayStats }: CurrentDayInfoProps) {
  return (
    <div className={styles.currentDayInfo}>
      <CurrentDayTotalTime
        className={styles.totalTime}
        time={dayStats.totalTime}
      />
      <CurrentDayPomodoroCount
        className={styles.pomodoroCount}
        pomodoroCount={dayStats.donePomodoroCount}
      />
    </div>
  );
}
