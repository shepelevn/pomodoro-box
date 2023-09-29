import React, { useEffect, useState } from 'react';

import {
  CommonSelect,
  OptionData,
} from 'components/common-components/CommonSelect';

const SELECT_OPTIONS: OptionData[] = [
  { value: 0, label: 'Эта неделя' },
  { value: 1, label: 'Прошедшая неделя' },
  { value: 2, label: '2 недели назад' },
  { value: 3, label: '3 недели назад' },
  { value: 4, label: '4 недели назад' },
];

interface WeekSelectProps {
  setWeekCallback: (week: number) => void;
}

export function WeekSelect({ setWeekCallback }: WeekSelectProps) {
  const [value, setValue] = useState(SELECT_OPTIONS[0]);

  const handleChange = (option: OptionData) => {
    setValue(option);
    setWeekCallback(option.value);
  };

  return (
    <CommonSelect
      value={value}
      changeCallback={handleChange}
      options={SELECT_OPTIONS}
    />
  );
}
