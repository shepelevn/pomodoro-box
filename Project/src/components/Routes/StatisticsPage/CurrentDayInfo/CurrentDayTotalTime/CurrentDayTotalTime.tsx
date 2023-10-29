import React from 'react';

import { formatRelativeMinToHour } from 'utils/formatTime/formatRelativeMinToHours';

import styles from './currentdaytotaltime.module.scss';

interface CurrentDayTotalTimeProps {
  className: string;
  time: number;
}

export function CurrentDayTotalTime({
  className,
  time,
}: CurrentDayTotalTimeProps) {
  return (
    <div className={`${className} ${styles.container} common-box-container`}>
      <h2 className={styles.title}>{getCurrentWeekdayString(new Date())}</h2>

      {time !== 0 ? (
        <p className={styles.text}>
          Вы работали над задачами в течение
          <span className={styles.time}> {formatTotalWorkTime(time)}</span>
        </p>
      ) : (
        <p className={styles.text}>Нет данных</p>
      )}
    </div>
  );
}

function formatTotalWorkTime(timeSeconds: number) {
  return formatRelativeMinToHour(Math.floor(timeSeconds / 60));
}

function getCurrentWeekdayString(date: Date) {
  const weekDayString = date.toLocaleString('ru-Ru', { weekday: 'long' });
  return weekDayString[0].toUpperCase() + weekDayString.slice(1);
}
