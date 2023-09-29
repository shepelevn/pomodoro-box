export default function formatMinToHourString(min: number): string {
  const hours = Math.floor(min / 60);
  const minutesRemainder = min % 60;

  const hoursString = hours > 0 ? `${hours} ч ` : '';
  const minutesString = minutesRemainder > 0 ? `${minutesRemainder} мин` : '';

  return hoursString + minutesString !== ''
    ? `${hoursString} ${minutesString}`
    : '0';
}
