export default function formatMinToFullHourString(min: number): string {
  const hours = Math.floor(min / 60);
  const minutesRemainder = min % 60;

  const hoursString = hours > 0 ? `${hours} часов ` : '';
  const minutesString = minutesRemainder > 0 ? `${minutesRemainder} минут` : '';

  return hoursString + minutesString !== ''
    ? `${hoursString} ${minutesString}`
    : '0';
}
