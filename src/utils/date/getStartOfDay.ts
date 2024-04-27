export function getStartOfDay(inputDate: Date): Date {
  const date = new Date(inputDate);
  date.setHours(0, 0, 0, 0);

  return date;
}
