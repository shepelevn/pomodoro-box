import { Task } from './tasks';

export function calculateTotalPomodorCount(tasks: Task[]) {
  return tasks.reduce(
    (accumulator, currentItem) => accumulator + currentItem.pomodoroCount,
    0
  );
}
