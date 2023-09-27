import React from 'react';

import { createTypedHooks } from 'easy-peasy';

import { DEFAULT_POMODORO_TIME_MINUTES } from 'globalVariables';

import { EasyPeasyStoreModel } from 'utils/easyPeasy/store';
import { calculateTotalPomodorCount } from 'utils/easyPeasy/calculateTotalPomodoroCount';

import { NewTaskForm } from './NewTaskForm';
import { TasksList } from './TasksList';

import styles from './taskspanel.module.scss';
import formatMinToHourString from 'utils/formatMinToHourString';

const { useStoreState } = createTypedHooks<EasyPeasyStoreModel>();

interface TasksPanelProps {
  className: string;
}

export function TasksPanel({ className }: TasksPanelProps) {
  const tasks = useStoreState((state) => state.tasks.tasks);

  return (
    <div className={`${className} ${styles.section}`}>
      <NewTaskForm className={styles.form} />
      <TasksList className={styles.list} tasks={tasks} />
      <div className={styles.timeToComplete}>
        {formatMinToHourString(
          calculateTotalPomodorCount(tasks) * DEFAULT_POMODORO_TIME_MINUTES
        )}
      </div>
    </div>
  );
}
