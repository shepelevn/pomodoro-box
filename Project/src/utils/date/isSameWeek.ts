import { getMonday } from './getMonday';

export function isSameWeek(date1: Date, date2: Date): boolean {
  return createCompareDateString(date1) === createCompareDateString(date2);
}

function createCompareDateString(date: Date): string {
  const mondayDate = getMonday(date);
  return `${mondayDate.getFullYear()}.${mondayDate.getMonth()}.${mondayDate.getDate()}`;
}
