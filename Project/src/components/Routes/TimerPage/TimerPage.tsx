import React from 'react';

import { InfoSection } from './InfoSection';
import { TasksPanel } from './TasksPanel';
import { TaskTimerPanelContainer } from './TaskTimerPanelContainer';

import styles from './timerpage.module.scss';

export function TimerPage() {
  return (
    <section className={`${styles.container} container`}>
      <InfoSection />
      <TaskTimerPanelContainer className={styles.timerPanel} />
      <TasksPanel className={styles.tasksPanel} />
    </section>
  );
}
