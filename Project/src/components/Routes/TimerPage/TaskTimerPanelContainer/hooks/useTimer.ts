import { useRef, useState } from 'react';

import {
  ADDED_TIMER_TIME_SECONDS,
  MAX_TIMER_TIME_SECONDS,
  TIMER_STEP_MS,
} from 'globalVariables';

type TimerInterval = ReturnType<typeof setInterval> | undefined;

export function useTimer(initialTimeSeconds: number) {
  const [timerTime, setTimerTime] = useState(initialTimeSeconds);
  const [timerTimeElapsed, setTimerTimeElapsed] = useState(0);

  const timerIntervalIdRef = useRef<TimerInterval>(undefined);

  function startTimer() {
    clearInterval(timerIntervalIdRef.current);

    timerIntervalIdRef.current = setInterval(() => {
      setTimerTime((time) => time - 1);
      setTimerTimeElapsed((time) => time + 1);
    }, TIMER_STEP_MS);
  }

  function pauseTimer() {
    clearInterval(timerIntervalIdRef.current);
  }

  function resetTimer(newTime: number) {
    setTimerTime(newTime);
    setTimerTimeElapsed(0);
  }

  function addTime() {
    setTimerTime((time) =>
      Math.min(time + ADDED_TIMER_TIME_SECONDS, MAX_TIMER_TIME_SECONDS)
    );
  }

  return {
    timerTime,
    timerTimeElapsed,
    startTimer,
    pauseTimer,
    resetTimer,
    addTime,
  };
}

export function usePauseTime(addTimeCallback: () => void) {
  const pauseTimerIntervalIdRef = useRef<TimerInterval>(undefined);

  function startPauseTimer() {
    pauseTimerIntervalIdRef.current = setInterval(() => {
      addTimeCallback();
    }, TIMER_STEP_MS);
  }

  function stopPauseTimer() {
    clearInterval(pauseTimerIntervalIdRef.current);
  }

  return { startPauseTimer, stopPauseTimer };
}
