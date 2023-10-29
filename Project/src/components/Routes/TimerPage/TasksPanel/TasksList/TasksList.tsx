import React from 'react';

import { Task } from 'utils/easyPeasy/tasks';

import { TaskItem } from './TaskItem';

interface TasksListProps {
  className: string;
  tasks: Task[];
}

export function TasksList({ className, tasks }: TasksListProps) {
  return (
    <ul className={className}>
      {tasks.map((item) => (
        <TaskItem
          name={item.name}
          pomodoroCount={item.pomodoroCount}
          id={item.id}
          key={item.id}
        />
      ))}
    </ul>
  );
}
