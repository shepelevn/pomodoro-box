import { useStatistics } from 'hooks/useStatistics';
import { useState } from 'react';

import { CurrentDayInfo } from './CurrentDayInfo';
import { StatisticsHeader } from './StatisticsHeader';
import styles from './statisticspage.module.scss';
import { TimerUseChart } from './TimerUseChart';
import { UserStats } from './UserStats';

export function StatisticsPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const { dayStats, chartStats } = useStatistics();

  return (
    <div className={'container'}>
      <StatisticsHeader
        className={styles.statisticsHeader}
        setWeekCallback={setSelectedWeek}
      />
      <div className={styles.mainContent}>
        <CurrentDayInfo dayStats={dayStats} />
        <TimerUseChart chartStats={chartStats} selectedWeek={selectedWeek} />
      </div>
      <UserStats stats={dayStats} />
    </div>
  );
}
