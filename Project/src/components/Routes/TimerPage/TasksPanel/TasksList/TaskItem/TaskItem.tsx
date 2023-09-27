import React, { useState } from 'react';
import { createTypedHooks } from 'easy-peasy';

import { EasyPeasyStoreModel } from 'utils/easyPeasy/store';

import { EditableField } from 'components/common-components/EditableField';
import { TaskMenuDropdown } from './TaskMenuDropdown';

import styles from './taskitem.module.scss';
import { MAX_NAME_LENGTH } from 'globalVariables';
import { Task } from 'utils/easyPeasy/tasks';
import { setNewCurrentTaskByAction } from 'utils/easyPeasy/setNewCurrentTask';

const { useStoreActions } = createTypedHooks<EasyPeasyStoreModel>();

interface TaskItemProps {
  name: string;
  pomodoroCount: number;
  id: number;
}

export function TaskItem({ name, pomodoroCount, id }: TaskItemProps) {
  const { changeTask, changeTaskPomodoroCount, deleteTaskAndCurrent } =
    useStoreActions((actions) => actions.tasks);
  const { changeCurrentTask } = useStoreActions(
    (actions) => actions.currentTask
  );

  const [isNameEditable, setIsNameEditable] = useState(false);

  return (
    <li className={styles.item}>
      <div className={styles.leftSide}>
        <div
          className={styles.pomodoroCount}
          aria-description="Количество помидоров для задачи"
        >
          {pomodoroCount}
        </div>
        <EditableField
          inputClassName={styles.nameInput}
          value={name}
          isActive={isNameEditable}
          onChangeCallback={(newValue) => {
            changeTaskName(newValue);
            setIsNameEditable(false);
          }}
        />
      </div>
      <TaskMenuDropdown
        addPomodoro={pomodoroCount < 9 ? addPomodoro : undefined}
        subtractPomodoro={pomodoroCount > 1 ? subtractPomodoro : undefined}
        editCallback={() => {
          setIsNameEditable(true);
        }}
        deleteCallback={() => {
          deleteTaskAndCurrent(id);
        }}
      />
    </li>
  );

  function addPomodoro() {
    changeTaskPomodoroCount({ pomodoroCount: pomodoroCount + 1, id });
  }

  function subtractPomodoro() {
    changeTaskPomodoroCount({ pomodoroCount: pomodoroCount - 1, id });
  }

  function changeTaskName(name: string) {
    const safeName =
      name.length <= MAX_NAME_LENGTH
        ? name
        : name.substring(0, MAX_NAME_LENGTH);

    changeTask({
      newTaskProperties: { name: safeName },
      id,
    });

    changeCurrentTask([id, safeName]);
  }
}
