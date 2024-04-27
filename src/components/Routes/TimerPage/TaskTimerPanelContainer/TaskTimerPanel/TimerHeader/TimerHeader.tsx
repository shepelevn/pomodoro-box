import React from 'react';
import styles from './timerheader.module.scss';

interface TimerHeaderProps {
  className: string;
  name: string;
  isBreak: boolean;
  donePomodoroCount: number;
}

export function TimerHeader({
  className,
  name,
  isBreak,
  donePomodoroCount,
}: TimerHeaderProps) {
  const countName = isBreak ? 'Перерыв' : 'Помидор';
  const count = isBreak ? donePomodoroCount - 1 : donePomodoroCount;

  return (
    <div className={`${className} ${styles.container}`}>
      <div className={styles.name}>{name}</div>
      <div>
        {countName} {count}
      </div>
    </div>
  );
}
