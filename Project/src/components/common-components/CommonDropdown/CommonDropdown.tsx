import React from 'react';
import { Menu, MenuItem, MenuButton, MenuGroup } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import '@szhsin/react-menu/dist/index.css';

import styles from './commondropdown.module.scss';

import './commondropdown.scss';
import noop from 'utils/noop';

interface CommonDropdownProps {
  menuButtonComponent: React.JSX.Element;
  menuItems: React.JSX.Element[];
  callbacks: ((() => void) | undefined)[];
}

export function CommonDropdown({
  menuButtonComponent,
  menuItems,
  callbacks,
}: CommonDropdownProps) {
  return (
    <Menu
      menuButton={
        <MenuButton className={`${styles.menuButton} clear-button`}>
          {menuButtonComponent}
        </MenuButton>
      }
      direction="bottom"
      arrow={true}
    >
      <MenuGroup className={styles.menuContainer}>
        {menuItems.map((itemElement, index) => (
          <MenuItem key={index} onClick={callbacks[index] || noop}>
            {itemElement}
          </MenuItem>
        ))}
      </MenuGroup>
    </Menu>
  );
}
