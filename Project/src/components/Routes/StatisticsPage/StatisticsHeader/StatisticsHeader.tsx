import React from 'react';

import { WeekSelect } from './WeekSelect';

import styles from './statisticsheader.module.scss';

interface StatisticsHeaderProps {
  className: string;
  setWeekCallback: (week: number) => void;
}

export function StatisticsHeader({
  className,
  setWeekCallback,
}: StatisticsHeaderProps) {
  return (
    <div className={`${className} ${styles.statisticsHeader}`}>
      <h1 className={styles.title}>Ваша активность</h1>
      <WeekSelect setWeekCallback={setWeekCallback} />
    </div>
  );
}
