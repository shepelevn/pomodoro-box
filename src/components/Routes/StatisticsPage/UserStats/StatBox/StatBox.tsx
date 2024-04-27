import React, { FunctionComponent, SVGProps } from 'react';

import styles from './statbox.module.scss';

interface StatBoxProps {
  className: string;
  valueClassName?: string;
  title: string;
  value: string;
  IconComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export function StatBox({
  className,
  valueClassName = '',
  title,
  value,
  IconComponent,
}: StatBoxProps) {
  return (
    <div className={`${className} ${styles.box} common-box-container`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={`${valueClassName} ${styles.value}`}>{value}</p>
      <IconComponent className={styles.icon} />
    </div>
  );
}
