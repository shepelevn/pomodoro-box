export function isSameWeek(date1: Date, date2: Date): boolean {
  return createCompareDateString(date1) === createCompareDateString(date2);
}

function createCompareDateString(date: Date): string {
  const mondayDate = getMonday(date);
  return `${mondayDate.getFullYear()}.${mondayDate.getMonth()}.${mondayDate.getDate()}`;
}

function getMonday(d: Date) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}
