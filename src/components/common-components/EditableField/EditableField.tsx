import React, { SyntheticEvent, useEffect, useState } from 'react';

import { MAX_NAME_LENGTH } from 'globalVariables';

interface EditableFieldProps {
  className?: string;
  inputClassName?: string;
  value: string;
  isActive: boolean;
  onChangeCallback: (value: string) => void;
}

export function EditableField({
  className = '',
  inputClassName = '',
  value,
  isActive,
  onChangeCallback,
}: EditableFieldProps) {
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return isActive ? (
    <form onSubmit={handleSubmit}>
      <input
        className={`${inputClassName} clear-input`}
        value={innerValue}
        onChange={handleChange}
        onBlur={(event: SyntheticEvent<HTMLInputElement>) => {
          onChangeCallback(event.currentTarget.value);
        }}
        size={innerValue.length}
        autoFocus
      />
    </form>
  ) : (
    <div className={className}>{value}</div>
  );

  function handleChange(event: SyntheticEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;

    if (value.length <= MAX_NAME_LENGTH) setInnerValue(value);
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = event.currentTarget.elements[0] as HTMLInputElement;
    onChangeCallback(input.value);
  }
}
