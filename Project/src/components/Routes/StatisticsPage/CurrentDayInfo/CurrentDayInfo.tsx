import React from 'react';

import { CurrentDayTotalTime } from './CurrentDayTotalTime';
import { CurrentDayPomodoroCount } from './CurrentDayPomodoroCount';

import styles from './currentdayinfo.module.scss';

export function CurrentDayInfo() {
  return (
    <div className={styles.currentDayInfo}>
      <CurrentDayTotalTime className={styles.totalTime} />
      <CurrentDayPomodoroCount className={styles.pomodoroCount} />
    </div>
  );
}
