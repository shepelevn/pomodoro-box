import { useEffect, useState } from 'react';
import { createTypedHooks } from 'easy-peasy';

import {
  BIG_BREAK_NUMBER,
  BIG_BREAK_TIME_MINUTES,
  DEFAULT_BREAK_TIME_MINUTES,
  DEFAULT_POMODORO_TIME_MINUTES,
} from 'globalVariables';

import { EasyPeasyStoreModel } from 'utils/easyPeasy/store';
import noop from 'utils/noop';

import { setNewCurrentTaskByAction } from 'utils/easyPeasy/setNewCurrentTask';

import { TaskTimerPanel } from './TaskTimerPanel/TaskTimerPanel';
import { usePauseTime, useTimer } from './hooks/useTimer';
import { useTimerStatsState } from './hooks/useTimerStatsState/useTimerStatsState';
import { Task } from 'utils/easyPeasy/tasks';
import { useStatistics } from 'hooks/useStatistics';
import { showNotification } from 'utils/showNotification';

const { useStoreState, useStoreActions } =
  createTypedHooks<EasyPeasyStoreModel>();

var alarmSound = new Audio(process.env.PUBLIC_URL + '/sounds/alarm.mp3');

export enum TimerState {
  Stopped,
  Running,
  Paused,
  BreakRunning,
  BreakPaused,
}

interface TaskTimerPanelContainerProps {
  className: string;
}

export function TaskTimerPanelContainer({
  className,
}: TaskTimerPanelContainerProps) {
  const tasks = useStoreState((state) => state.tasks.tasks);
  const { changeTaskPomodoroCount, deleteTask } = useStoreActions(
    (actions) => actions.tasks
  );

  const [timerState, setTimerState] = useState<TimerState>(TimerState.Stopped);

  const {
    timerTime,
    timerTimeElapsed,
    startTimer,
    pauseTimer,
    resetTimer,
    addTime,
  } = useTimer(DEFAULT_POMODORO_TIME_MINUTES * 60);
  useEffect(() => {
    if (timerTime <= 0) {
      if (timerState === TimerState.Running) taskDone();
      else breakDoneWithNotification();
    }
  }, [timerTime]);

  const { startPauseTimer, stopPauseTimer } = usePauseTime(() => {
    addPausedTime();
  });

  const { currentDayTasksCount, incrementCurrentDayTasksCount } =
    useTimerStatsState();

  const currentTask = useStoreState((state) => state.currentTask);
  const { changeCurrentTask, incrementDonePomodoroCount } = useStoreActions(
    (actions) => actions.currentTask
  );
  useEffect(() => {
    const task = tasks[0];

    if (
      (!task && currentTask.taskId) ||
      (task && currentTask.taskId !== task.id)
    )
      setNewCurrentTask(task);
  }, []);

  useEffect(() => {
    if (currentTask.taskId === undefined) setNewCurrentTask(tasks[0]);
  }, [tasks, currentTask]);

  const [primaryButtonHandle, secondaryButtonHandle] =
    getTimerHandlers(timerState);

  const {
    addCurrentDayStatTotalTime,
    addCurrentDayStatPomodoro,
    addFocusedTime,
    addUnfocusedTime,
    addPausedTime,
    addStop,
    addChartTime,
  } = useStatistics();

  return (
    <TaskTimerPanel
      className={className}
      timerState={timerState}
      task={currentTask}
      currentDayTasksCount={currentDayTasksCount}
      timerTime={timerTime}
      addTimeCallback={addTime}
      primaryButtonHandle={primaryButtonHandle}
      secondaryButtonHandle={secondaryButtonHandle}
    />
  );

  function setNewCurrentTask(task: Task | undefined) {
    setNewCurrentTaskByAction(task, changeCurrentTask);
  }

  // Timer state setters

  function setTimerStart() {
    stopPauseTimer();

    startTimer();

    setTimerState(TimerState.Running);
  }

  function stopPomodoro() {
    addStop();
    addUnfocusedTime(timerTimeElapsed);
    addCurrentDayStatTotalTime(timerTimeElapsed);
    addChartTime(timerTimeElapsed);

    setTimerStop();
  }

  function setTimerStop() {
    resetTimer(DEFAULT_POMODORO_TIME_MINUTES * 60);
    pauseTimer();

    setTimerState(TimerState.Stopped);
  }

  function setTimerPause() {
    startPauseTimer();

    pauseTimer();

    setTimerState(TimerState.Paused);
  }

  function taskDonePrematurely() {
    stopPauseTimer();

    addFocusedTime(timerTimeElapsed);
    addCurrentDayStatTotalTime(timerTimeElapsed);
    addChartTime(timerTimeElapsed);

    resetTimer(DEFAULT_POMODORO_TIME_MINUTES * 60);
    pauseTimer();

    incrementDonePomodoroCount();
    deleteTask(tasks[0].id);

    setTimerBreakStart();
  }

  function taskDone() {
    alarmSound.play();
    showNotification('Время работы истекло. Сделайте перерыв.');

    stopPauseTimer();

    addCurrentDayStatTotalTime(timerTimeElapsed);
    addCurrentDayStatPomodoro();
    addFocusedTime(timerTimeElapsed);
    addChartTime(timerTimeElapsed);

    incrementDonePomodoroCount();
    setTimerBreakStart();

    const task = tasks[0];

    if (task) {
      if (task.pomodoroCount <= 1) {
        deleteTask(task.id);
      } else
        changeTaskPomodoroCount({
          pomodoroCount: task.pomodoroCount - 1,
          id: task.id,
        });
    }
  }

  function setTimerBreakStart() {
    if (currentTask.donePomodoroCount === BIG_BREAK_NUMBER)
      resetTimer(BIG_BREAK_TIME_MINUTES * 60);
    else resetTimer(DEFAULT_BREAK_TIME_MINUTES * 60);

    startTimer();

    setTimerState(TimerState.BreakRunning);
  }

  function setTimerBreakRunning() {
    stopPauseTimer();

    startTimer();

    setTimerState(TimerState.BreakRunning);
  }

  function setTimerBreakPause() {
    startPauseTimer();

    pauseTimer();

    setTimerState(TimerState.BreakPaused);
  }

  function breakDoneWithNotification() {
    alarmSound.play();
    showNotification('Перерыв закончился.');

    breakDone();
  }

  function breakDone() {
    stopPauseTimer();

    const task = tasks[0];

    if (!task || task.id !== currentTask.taskId) {
      incrementCurrentDayTasksCount();
      setNewCurrentTask(task);
    }

    setTimerStop();
  }

  function getTimerHandlers(state: TimerState): [() => void, () => void] {
    let primaryButtonHandle;
    let secondaryButtonHandle;

    switch (state) {
      case TimerState.Running:
        primaryButtonHandle = setTimerPause;
        secondaryButtonHandle = stopPomodoro;
        break;
      case TimerState.Paused:
        primaryButtonHandle = setTimerStart;
        secondaryButtonHandle = taskDonePrematurely;
        break;
      case TimerState.BreakRunning:
        primaryButtonHandle = setTimerBreakPause;
        secondaryButtonHandle = breakDone;
        break;
      case TimerState.BreakPaused:
        primaryButtonHandle = setTimerBreakRunning;
        secondaryButtonHandle = breakDone;
        break;
      // Состояние Stopped
      default:
        primaryButtonHandle = setTimerStart;
        secondaryButtonHandle = noop;
    }

    return [primaryButtonHandle, secondaryButtonHandle];
  }
}
