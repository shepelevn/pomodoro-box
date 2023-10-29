export function formatRelativeMinToHour(timeMinutes: number): string {
  const hours = Math.floor(timeMinutes / 60);
  const minutesRemainder = timeMinutes % 60;

  const hoursString = hours !== 0 ? createHoursString(hours) : '';

  const minutesString =
    minutesRemainder !== 0 ? createMinutesString(minutesRemainder) : '';

  return `${hoursString} ${minutesString}`;
}

function createHoursString(hours: number): string {
  let hoursString = 'часов';

  if (hours % 10 === 1 && hours !== 11) hoursString = 'часа';

  return `${hours} ${hoursString}`;
}

function createMinutesString(minutes: number): string {
  let minutesString = 'минут';

  if (minutes % 10 === 1 && minutes !== 11) minutesString = 'минуты';

  return `${minutes} ${minutesString}`;
}
