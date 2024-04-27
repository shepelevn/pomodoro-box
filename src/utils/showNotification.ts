export function showNotification(message: string): void {
  if (!('Notification' in window)) {
    return;
  } else if (Notification.permission === 'granted') {
    new Notification(message);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(message);
      }
    });
  }
}
