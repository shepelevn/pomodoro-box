import React, { useState } from 'react';

import { CommonSelect } from 'components/common-components/CommonSelect';

const SELECT_OPTIONS = [
  { value: 'current', label: 'Эта неделя' },
  { value: '1previous', label: 'Прошедшая неделя' },
  { value: '2previous', label: '2 недели назад' },
  { value: '3previous', label: '3 недели назад' },
  { value: '4previous', label: '4 недели назад' },
];

export function WeekSelect() {
  const [value, setValue] = useState(SELECT_OPTIONS[0]);

  return (
    <CommonSelect
      value={value}
      changeCallback={setValue}
      options={SELECT_OPTIONS}
    />
  );
}
