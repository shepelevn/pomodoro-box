import React from 'react';
import styles from './currentdaytotaltime.module.scss';

interface CurrentDayTotalTimeProps {
  className: string;
}

export function CurrentDayTotalTime({ className }: CurrentDayTotalTimeProps) {
  return (
    <div className={`${className} common-box-container`}>
      <h2 className={styles.title}>Понедельник</h2>
      <p className={styles.text}>
        Вы работали над задачами в течение
        <span className={styles.time}> 51 минуты</span>
      </p>
    </div>
  );
}
