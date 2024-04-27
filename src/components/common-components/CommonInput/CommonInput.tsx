import { SyntheticEvent } from 'react';
import styles from './commoninput.module.scss';

interface CommonInputProps {
  value: string;
  name: string;
  onChangeCallback: (value: string) => void;
  errorMessage: string;
  isActive: boolean;
  placeholder: string;
}

export function CommonInput({
  value,
  name,
  onChangeCallback,
  errorMessage,
  isActive,
  placeholder,
}: CommonInputProps) {
  const isInvalid = errorMessage !== '';

  return (
    <div>
      <div className={styles.errorMessage}>{isActive ? errorMessage : ''}</div>
      <input
        className={`${
          isActive ? (isInvalid ? 'common-input_invalid' : '') : ''
        } common-input`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event: SyntheticEvent<HTMLInputElement>) => {
          onChangeCallback(event.currentTarget.value);
        }}
        name={name}
      />
    </div>
  );
}
