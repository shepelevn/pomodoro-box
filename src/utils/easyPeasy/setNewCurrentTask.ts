import { Task } from './tasks';

export function setNewCurrentTaskByAction(
  task: Task | undefined,
  taskAction: (taskData: [id: number | undefined, name: string]) => void
) {
  if (task) taskAction([task.id, task.name]);
  else taskAction([undefined, '']);
}
