import React, { useState } from 'react';
import { createTypedHooks } from 'easy-peasy';

import { EasyPeasyStoreModel } from 'utils/easyPeasy/store';

import { EditableField } from 'components/common-components/EditableField';
import { TaskMenuDropdown } from './TaskMenuDropdown';
import { DeleteModal } from './DeleteModal';

import { MAX_NAME_LENGTH } from 'globalVariables';

import styles from './taskitem.module.scss';

const { useStoreState, useStoreActions } =
  createTypedHooks<EasyPeasyStoreModel>();

interface TaskItemProps {
  name: string;
  pomodoroCount: number;
  id: number;
}

export function TaskItem({ name, pomodoroCount, id }: TaskItemProps) {
  const { tasks } = useStoreState((state) => state.tasks);
  const currentTask = useStoreState((state) => state.currentTask);
  const index = tasks.findIndex((value) => value.id === id);

  const {
    changeTask,
    changeTaskPomodoroCount,
    deleteTaskAndCurrent,
    moveTask,
  } = useStoreActions((actions) => actions.tasks);
  const { changeCurrentTaskName } = useStoreActions(
    (actions) => actions.currentTask
  );

  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        deleteCallback={showDeleteModal}
        moveUpCallback={index > 0 ? moveUp : undefined}
        moveDownCallback={index < tasks.length - 1 ? moveDown : undefined}
      />

      <div className={styles.modalContainer}>
        <DeleteModal
          deleteCallback={() => {
            deleteTaskAndCurrent(id);
          }}
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
        />
      </div>
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

    if (id === currentTask.taskId) changeCurrentTaskName(safeName);
  }

  function showDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function moveUp() {
    moveTask({ id, direction: 'up' });
  }

  function moveDown() {
    moveTask({ id, direction: 'down' });
  }
}
