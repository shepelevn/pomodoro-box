import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

import {
  COLOR_BLACK,
  COLOR_GRAY_LIGHTER,
  COLOR_SECONDARY,
} from 'globalVariables';

import { CustomTick } from './CustomTick';

import formatMinToHourString from 'utils/formatMinToHourString';

import './chart.scss';
import styles from './chart.module.scss';

export interface DataItem {
  name: string;
  value: number;
}

interface AriaDataItem {
  name: string;
  value: string;
}

interface ChartProps {
  data: DataItem[];
  ariaData: AriaDataItem[];
  activeIndex: number;
}

const TICKS_COUNT = 4;
const ROUND_CUTOFF = 10;

export function Chart({ data, ariaData, activeIndex }: ChartProps) {
  const ticks = generateTicks(data, TICKS_COUNT, ROUND_CUTOFF);

  return (
    <div aria-label={createChartAriaDescription(ariaData)}>
      <div className={styles.wrapper} aria-hidden={true}>
        <ResponsiveContainer
          className={styles.responsiveContainer}
          width="99%"
          height={471}
        >
          <BarChart data={data} barCategoryGap="15%">
            <CartesianGrid
              vertical={false}
              stroke="#CDCDCD"
              fill={COLOR_GRAY_LIGHTER}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              height={50}
              tick={<CustomTick activeIndex={activeIndex} />}
            />
            <YAxis
              ticks={ticks}
              orientation="right"
              axisLine={false}
              tickLine={false}
              width={130}
              dx={30}
              tick={{
                fill: COLOR_BLACK,
                fontSize: '14px',
                fontWeight: '400',
              }}
              tickFormatter={(value) => formatMinToHourString(value)}
            />
            <Tooltip
              cursor={false}
              formatter={(value: number, name) => {
                return [formatMinToHourString(value), name];
              }}
              contentStyle={{ fontSize: '16px' }}
            />
            <Bar
              dataKey="value"
              fill={COLOR_SECONDARY}
              minPointSize={5}
              onMouseEnter={handleBarMouseEnter}
              onMouseLeave={handleBarMouseLeave}
            >
              {data.map((entry, index) => {
                return (
                  <Cell
                    className={getCellClassNames(entry, index, activeIndex)}
                    key={`cell-${index}`}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className={styles.bottomBackground}></div>
      </div>
    </div>
  );
}

const PADDING_MULTIPLIER = 1.1;

function generateTicks(
  data: DataItem[],
  ticksCount: number,
  roundCutoff: number
): number[] {
  const maxValue: number = data.reduce<number>(
    (accumulator: number, currentDataItem) =>
      currentDataItem.value > accumulator ? currentDataItem.value : accumulator,
    0
  );

  const ticks = [];
  const step =
    Math.round(
      (maxValue * PADDING_MULTIPLIER) / (ticksCount + 1) / roundCutoff
    ) * roundCutoff;
  let newTick = 0;

  for (let i = 0; i < ticksCount; i++) {
    newTick += step;
    ticks.push(newTick);
  }

  return ticks;
}

function getCellClassNames(
  entry: DataItem,
  index: number,
  activeIndex: number
): string {
  if (entry.value === 0) {
    return styles.disabledCell;
  } else if (index === activeIndex) {
    return styles.activeCell;
  } else {
    return styles.inactiveCell;
  }
}

function handleBarMouseEnter() {
  changeTooltipDisplay('block');
}

function handleBarMouseLeave() {
  changeTooltipDisplay('none');
}

function changeTooltipDisplay(displayValue: string) {
  const elementsList = document.getElementsByClassName(
    'recharts-tooltip-wrapper'
  ) as HTMLCollectionOf<HTMLElement>;

  const tooltipWrapperDiv = elementsList[0];

  tooltipWrapperDiv.style.display = displayValue;
}

function createChartAriaDescription(data: AriaDataItem[]) {
  let resultDescription = '';

  for (let i = 0; i < data.length; i++) {
    const label = data[i].name;
    const value = data[i].value;

    resultDescription += `${label} ${value}. `;
  }

  return resultDescription.trim();
}
