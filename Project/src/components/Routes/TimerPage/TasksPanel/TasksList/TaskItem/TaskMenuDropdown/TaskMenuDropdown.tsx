import React, { FunctionComponent, SVGProps } from 'react';

import { CommonDropdown } from 'components/common-components/CommonDropdown';

import { ReactComponent as plusSvg } from './svg/plus-menu.svg';
import { ReactComponent as minusSvg } from './svg/minus-menu.svg';
import { ReactComponent as editSvg } from './svg/edit.svg';
import { ReactComponent as deleteSvg } from './svg/trashcan.svg';

import { ReactComponent as MenuIcon } from 'images/svg/menu.svg';

import styles from './taskmenudropdown.module.scss';

interface MenuItemData {
  title: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface TaskMenuDropdownProps {
  addPomodoro?: () => void;
  subtractPomodoro?: () => void;
  editCallback: () => void;
  deleteCallback: () => void;
}

const menuItemsData = [
  {
    title: 'Увеличить',
    icon: plusSvg,
  },
  {
    title: 'Уменьшить',
    icon: minusSvg,
  },
  {
    title: 'Редактировать',
    icon: editSvg,
  },
  {
    title: 'Удалить',
    icon: deleteSvg,
  },
];

export function TaskMenuDropdown({
  addPomodoro,
  subtractPomodoro,
  editCallback,
  deleteCallback,
}: TaskMenuDropdownProps) {
  const dropdownCallbacks = [
    addPomodoro,
    subtractPomodoro,
    editCallback,
    deleteCallback,
  ];

  return (
    <CommonDropdown
      menuButtonComponent={
        <span className={`${styles.menuButton} common-transition`}>
          <MenuIcon />
        </span>
      }
      menuItems={menuItemsData.map((data: MenuItemData, index) => {
        return (
          <div
            className={`${styles.menuItemButton} ${
              dropdownCallbacks[index] ? '' : styles.menuItemButton_disabled
            }`}
          >
            <data.icon className={`${styles.menuItemButtonIcon}`} />
            {data.title}
          </div>
        );
      })}
      callbacks={dropdownCallbacks}
    />
  );
}
