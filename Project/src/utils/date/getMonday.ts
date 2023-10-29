export function getMonday(date: Date) {
  date = new Date(date);
  var day = date.getDay(),
    diff = date.getDate() - day + (day === 0 ? -6 : 1);

  const monday = new Date(date);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);

  return monday;
}
