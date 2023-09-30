import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';

import { MAX_NAME_LENGTH } from 'globalVariables';
import { EasyPeasyStoreModel } from 'utils/easyPeasy/store';

import { CommonInput } from 'components/common-components/CommonInput';

import styles from './newtaskform.module.scss';

interface NewTaskFormProps {
  className: string;
}

export function NewTaskForm({ className }: NewTaskFormProps) {
  const addTask = useStoreActions<EasyPeasyStoreModel>(
    (actions) => actions.tasks.addTask
  );

  const [nameInputValue, setNameInputValue] = useState('');
  const [nameInputErrorMessage, setNameInputErrorMessage] = useState('');
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    if (nameInputValue.trim() === '') {
      setNameInputErrorMessage('Поле имя не может быть пустым');
    } else if (nameInputValue.trim().length > MAX_NAME_LENGTH) {
      setNameInputErrorMessage('Длина поля превышает положенную');
    } else {
      setNameInputErrorMessage('');
    }
  }, [nameInputValue]);

  return (
    <form
      className={`${styles.form} ${className}`}
      aria-label="Форма добавления новой задачи"
      onSubmit={handleSubmit}
    >
      <CommonInput
        value={nameInputValue}
        onChangeCallback={(value: string) => {
          setNameInputValue(value);
        }}
        errorMessage={nameInputErrorMessage}
        isActive={isFormActive}
        placeholder="Название задачи"
        name="task-name-input"
      />
      <button className="primary-button" type="submit">
        Добавить
      </button>
    </form>
  );

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    setIsFormActive(true);

    const value = nameInputValue;

    if (nameInputErrorMessage === '') {
      setNameInputValue('');
      setIsFormActive(false);

      addTask(value);
    }
  }
}
