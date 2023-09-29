import React from 'react';

import tomatoImg from 'images/tomato.svg';
import smilingTomatoImg from 'images/tomato-smile.svg';

import styles from './currentdaypomodorocount.module.scss';
import { numerateWord } from 'utils/numerateWord';

interface CurrentDayPomodoroCountProps {
  className: string;
  pomodoroCount: number;
}

export function CurrentDayPomodoroCount({
  className,
  pomodoroCount,
}: CurrentDayPomodoroCountProps) {
  if (pomodoroCount !== 0)
    return (
      <div className={`${className} ${styles.container}`}>
        <div className={`${styles.topContainer} common-box-container`}>
          <img
            className={styles.tomatoImage}
            src={tomatoImg}
            alt="Количество помидоров"
          />
          <span className={styles.pomodoroCount}>х {pomodoroCount}</span>
        </div>
        <div className={`${styles.bottomContainer} common-box-container`}>
          {`${pomodoroCount} ${numerateWord(pomodoroCount, [
            'помидор',
            'помидора',
            'помидоров',
          ])}`}
        </div>
      </div>
    );
  else
    return (
      <div className={`${className} ${styles.container}`}>
        <div className={`${styles.topContainer} common-box-container`}>
          <img
            className={styles.smilingTomato}
            src={smilingTomatoImg}
            alt="Улыбающийся томат"
          />
        </div>
      </div>
    );
}
