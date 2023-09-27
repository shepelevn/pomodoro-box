import React from 'react';

import tomatoImg from 'images/tomato.svg';

import styles from './currentdaypomodorocount.module.scss';

interface CurrentDayPomodoroCountProps {
  className: string;
}

export function CurrentDayPomodoroCount({
  className,
}: CurrentDayPomodoroCountProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <div className={`${styles.topContainer} common-box-container`}>
        <img
          className={styles.tomatoImage}
          src={tomatoImg}
          alt="Количество помидоров"
        />
        <span className={styles.pomodoroCount}>х 2</span>
      </div>
      <div className={`${styles.bottomContainer} common-box-container`}>
        2 помидора
      </div>
    </div>
  );
}
