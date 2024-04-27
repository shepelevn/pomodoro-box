export function isSameDay(date1: Date, date2: Date): boolean {
  return createCompareDateString(date1) === createCompareDateString(date2);
}

function createCompareDateString(inputDate: Date): string {
  const date = new Date(inputDate);

  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}
