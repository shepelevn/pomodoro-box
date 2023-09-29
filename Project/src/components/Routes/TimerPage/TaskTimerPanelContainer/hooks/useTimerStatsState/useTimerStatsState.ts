import { useEffect } from 'react';

import { createTypedHooks } from 'easy-peasy';

import { EasyPeasyStoreModel } from 'utils/easyPeasy/store';

const { useStoreState, useStoreActions } =
  createTypedHooks<EasyPeasyStoreModel>();

export function useTimerStatsState() {
  const { currentDayTasksCount } = useStoreState(
    (state) => state.currentDayStats
  );
  const { incrementCurrentDayTasksCount, checkCurrentDayDate } =
    useStoreActions((actions) => actions.currentDayStats);

  useEffect(() => {
    checkCurrentDayDate();
  }, []);

  return { currentDayTasksCount, incrementCurrentDayTasksCount };
}
