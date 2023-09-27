import React from 'react';

import { CurrentDayInfo } from './CurrentDayInfo';
import { StatisticsHeader } from './StatisticsHeader';
import styles from './statisticspage.module.scss';
import { TimerUseChart } from './TimerUseChart';
import { UserStats } from './UserStats';

export function StatisticsPage() {
  return (
    <div className={'container'}>
      <StatisticsHeader className={styles.statisticsHeader} />
      <div className={styles.mainContent}>
        <CurrentDayInfo />
        <TimerUseChart />
      </div>
      <UserStats />
    </div>
  );
}
