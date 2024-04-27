import React from 'react';

import { COLOR_GRAY_DARK, COLOR_SECONDARY } from 'globalVariables';

export function CustomTick(props: any) {
  const { x, y, payload } = props;

  const isActiveTick = payload.index === props.activeIndex;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={27}
        textAnchor="middle"
        fontSize="24px"
        fill={isActiveTick ? COLOR_SECONDARY : COLOR_GRAY_DARK}
      >
        {payload.value}
      </text>
    </g>
  );
}
