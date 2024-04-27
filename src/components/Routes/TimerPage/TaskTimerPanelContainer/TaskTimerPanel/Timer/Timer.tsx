import React from 'react';

import plusImg from 'images/svg/plus.svg';

import styles from './timer.module.scss';

interface TimerProps {
  className: string;
  timeSeconds: number;
  addTimeCallback: () => void;
}

export function Timer({ className, timeSeconds, addTimeCallback }: TimerProps) {
  return (
    <div className={`${className} ${styles.timer}`}>
      <time className={styles.time} dateTime={createDateTime(timeSeconds)}>
        {formatTime(timeSeconds)}
        <button
          className={`${styles.addButton} round-button`}
          onClick={addTimeCallback}
        >
          <img
            className={styles.addButtonIcon}
            src={plusImg}
            alt="Добавить время"
          />
        </button>
      </time>
    </div>
  );
}

function formatTime(timeSeconds: number) {
  const minutes = Math.floor(timeSeconds / 60);
  const secondsReminder = (timeSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${secondsReminder}`;
}

function createDateTime(timeSeconds: number) {
  const minutes = Math.floor(timeSeconds / 60);
  const secondsRemainder = timeSeconds % 60;

  const minutesString = minutes !== 0 ? minutes + 'M' : '';
  const secondsString = secondsRemainder !== 0 ? secondsRemainder + 'S' : '';

  return `PT${minutesString}${secondsString}`;
}
