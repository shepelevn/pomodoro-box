import React from 'react';

import { CurrentTaskData } from 'utils/easyPeasy/currentTaskStats';

import { TimerState } from '../TaskTimerPanelContainer';

import { TimerHeader } from './TimerHeader';
import { Timer } from './Timer';

import styles from './tasktimerpanel.module.scss';

interface TaskTimerPanelProps {
  className: string;
  timerState: TimerState;
  task: CurrentTaskData;
  currentDayTasksCount: number;
  timerTime: number;
  addTimeCallback: () => void;
  primaryButtonHandle: () => void;
  secondaryButtonHandle: () => void;
}

export function TaskTimerPanel({
  className,
  timerState,
  task,
  currentDayTasksCount,
  timerTime,
  addTimeCallback,
  primaryButtonHandle,
  secondaryButtonHandle,
}: TaskTimerPanelProps) {
  let primaryButtonText;
  let secondaryButtonText;
  let containerClassName;
  let isSecondButtonDisabled = false;
  let isBreak = false;
  switch (timerState) {
    case TimerState.Running:
      primaryButtonText = 'Пауза';
      secondaryButtonText = 'Стоп';
      containerClassName = styles.container_running;
      break;
    case TimerState.Paused:
      primaryButtonText = 'Продолжить';
      secondaryButtonText = 'Сделано';
      containerClassName = styles.container_paused;
      break;
    case TimerState.BreakRunning:
      primaryButtonText = 'Пауза';
      secondaryButtonText = 'Пропустить';
      containerClassName = styles.container_breakRunning;
      isBreak = true;
      break;
    case TimerState.BreakPaused:
      primaryButtonText = 'Продолжить';
      secondaryButtonText = 'Пропустить';
      containerClassName = styles.container_breakPaused;
      isBreak = true;
      break;
    // Состояние Stopped
    default:
      primaryButtonText = 'Старт';
      secondaryButtonText = 'Стоп';
      containerClassName = styles.container_stopped;
      isSecondButtonDisabled = true;
  }

  return task.taskId ? (
    <div className={`${className}`}>
      <div className={`${containerClassName} ${styles.container}`}>
        <TimerHeader
          className={styles.header}
          name={task.taskName}
          isBreak={isBreak}
          donePomodoroCount={task.donePomodoroCount}
        />
        <Timer
          className={styles.timer}
          timeSeconds={timerTime}
          addTimeCallback={addTimeCallback}
        />
        <div className={styles.taskInfo}>
          <span className={styles.taskNumber}>
            Задача {currentDayTasksCount} -
          </span>
          <span> {task.taskName}</span>
        </div>
        <div className={styles.controlButtons}>
          <button className="primary-button" onClick={primaryButtonHandle}>
            {primaryButtonText}
          </button>
          <button
            className="secondary-button"
            onClick={secondaryButtonHandle}
            disabled={isSecondButtonDisabled}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className={className}>
      <div className={styles.emptyContainer}>
        <h2 className={styles.emptyContainerTitle}>Список задач пуст</h2>
        <p className={styles.emptyContainerDescription}>
          Чтобы начать работу, добавьте задачу.
        </p>
      </div>
    </div>
  );
}
