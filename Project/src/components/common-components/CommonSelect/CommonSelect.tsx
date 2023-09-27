import React from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';

import {
  COLOR_BLACK,
  COLOR_GRAY_LIGHT,
  COLOR_GRAY_LIGHTER,
} from 'globalVariables';

import upImg from './svg/up.svg';
import downImg from './svg/down.svg';

interface OptionData {
  value: string;
  label: string;
}

interface CommonSelectProps {
  value: OptionData;
  options: OptionData[];
  changeCallback: (value: OptionData) => void;
}

const selectComponents = {
  DropdownIndicator: () => {
    return <></>;
  },
};

const selectStyles: StylesConfig<OptionData, false> = {
  container: (baseStyles) => ({
    ...baseStyles,
    zIndex: 1000,
    width: '370px',
    color: COLOR_BLACK,
    fontFamily: 'SF UI Display',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '17px',
  }),

  control: (baseStyles, state) => {
    const iconUrl = state.menuIsOpen ? upImg : downImg;
    const backgroundColor = state.isFocused
      ? COLOR_GRAY_LIGHT
      : COLOR_GRAY_LIGHTER;

    return {
      ...baseStyles,
      padding: '19px 32px 19px 15px',
      borderRadius: 0,
      border: 'none',
      backgroundImage: `url(${iconUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 17px center',
      backgroundColor,
      boxShadow: 'none',
      cursor: 'pointer',

      '&:hover': {
        outline: 'none',
      },
    };
  },

  indicatorSeparator: () => ({
    display: 'none',
  }),

  menu: (baseStyles) => ({
    ...baseStyles,
    bottom: '0',
    boxShadow: 'none',
    transform: 'translateY(-14px)',
  }),

  menuList: () => ({}),

  option: (baseStyles, state) => {
    const backgroundColor = state.isFocused
      ? COLOR_GRAY_LIGHT
      : COLOR_GRAY_LIGHTER;

    return {
      ...baseStyles,
      padding: '19px 32px 19px 15px',
      borderRadius: '0',
      border: 'none',
      borderTop: '1px solid #DEDEDE',
      color: COLOR_BLACK,
      backgroundColor,
    };
  },
};

export function CommonSelect({
  options,
  value,
  changeCallback,
}: CommonSelectProps) {
  const handleChange = (newValue: SingleValue<OptionData>) => {
    if (newValue !== null) {
      changeCallback(newValue);
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={options.filter((option) => option.value !== value.value)}
      components={selectComponents}
      classNamePrefix={'common-select'}
      styles={selectStyles}
      isSearchable={false}
    />
  );
}
