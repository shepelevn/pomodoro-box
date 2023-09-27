import { persist, useLocalStore } from 'easy-peasy';
import { useEffect } from 'react';
import { isSameDay } from 'utils/date/isSameDay';

import { currentDayStats, CurrentDayStatsModel } from './currentDayStats';

interface TimerStatsStoreModel {
  currentDayStats: CurrentDayStatsModel;
}

export function useTimerStatsState(): ReturnType<
  typeof useLocalStore<TimerStatsStoreModel>
> {
  const [state, actions, store] = useLocalStore<TimerStatsStoreModel>(
    () =>
      persist({
        currentDayStats,
      }),
    [],
    () => ({ version: 6 })
  );

  useEffect(() => {
    if (!isSameDay(state.currentDayStats.lastRecordDate, new Date())) {
      actions.currentDayStats.resetCurrentDayStats();
    }
  }, []);

  return [state, actions, store];
}
