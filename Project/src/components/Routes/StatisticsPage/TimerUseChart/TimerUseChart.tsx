import React from 'react';

import { Chart, DataItem } from 'components/common-components/Chart';

import styles from './timerusechart.module.scss';
import formatMinToFullHourString from 'utils/formatMinToFullHourString';

export function TimerUseChart() {
  const data: DataItem[] = [
    { name: 'Пн', value: 50 },
    { name: 'Вт', value: 100 },
    { name: 'Ср', value: 150 },
    { name: 'Чт', value: 25 },
    { name: 'Пт', value: 50 },
    { name: 'Сб', value: 75 },
    { name: 'Вс', value: 0 },
  ];
  const ariaNames = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  const activeIndex = 0;
  return (
    <div className={styles.container}>
      <Chart
        data={data}
        ariaData={createAriaData(ariaNames, data)}
        activeIndex={activeIndex}
      />
    </div>
  );
}

function createAriaData(names: string[], data: DataItem[]) {
  const ariaData = [];

  for (let i = 0; i < data.length; i++) {
    const ariaValue = formatMinToFullHourString(data[i].value);

    ariaData.push({ name: names[i], value: ariaValue });
  }

  return ariaData;
}
