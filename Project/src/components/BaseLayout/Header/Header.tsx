import React from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from 'images/tomato.svg';
import { ReactComponent as StatisticsIcon } from 'images/svg/statistics-icon.svg';

import styles from './header.module.scss';

export function Header() {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.container} container`}>
        <Link className={`${styles.logo} common-link`} to="/">
          <Logo className={styles.logoIcon} />
          <span className={styles.logoText}>pomodoro_box</span>
        </Link>
        <Link
          className={`${styles.statisticsLink} common-link`}
          to="/statistics"
        >
          <StatisticsIcon className={styles.statisticsIcon} />
          Статистика
        </Link>
      </div>
    </header>
  );
}
