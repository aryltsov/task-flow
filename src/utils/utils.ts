import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function formatCreatedAt(date = new Date()) {
  const timeZone = 'Europe/Kiev';
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, "MMMM d, yyyy 'at' hh:mm:ss a 'UTC'+2");
}
