import React from 'react';

import { ReactComponent as TargetSvg } from './svg/target.svg';
import { ReactComponent as ClockSvg } from './svg/clock.svg';
import { ReactComponent as StopSvg } from './svg/stop.svg';

import { StatBox } from './StatBox';

import styles from './userstats.module.scss';

export function UserStats() {
  return (
    <div className={styles.container}>
      <StatBox
        className={`${styles.box} ${styles.focus}`}
        title="Фокус"
        value="100%"
        IconComponent={TargetSvg}
      />
      <StatBox
        className={`${styles.box} ${styles.pausedTime}`}
        title="Время на паузе"
        value="20ч 30м"
        IconComponent={ClockSvg}
      />
      <StatBox
        className={`${styles.box} ${styles.stops}`}
        valueClassName={styles.stopsValue}
        title="Остановки"
        value="100"
        IconComponent={StopSvg}
      />
    </div>
  );
}
