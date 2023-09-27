import React from 'react';

import { WeekSelect } from './WeekSelect';

import styles from './statisticsheader.module.scss';

interface StatisticsHeaderProps {
  className: string;
}

export function StatisticsHeader({ className }: StatisticsHeaderProps) {
  return (
    <div className={`${className} ${styles.statisticsHeader}`}>
      <h1 className={styles.title}>Ваша активность</h1>
      <WeekSelect />
    </div>
  );
}
