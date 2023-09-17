import { format } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

const convertDate = (date: Date | string) => {
  return new Date(date);
};

export const formatDate = (
  date: Date | string,
  pattern = 'yyyy/MM/dd HH:mm'
): string => {
  return format(convertDate(date), pattern);
};

export const convertUtcToZonedTime = (date: Date | string): Date => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const dateObj = convertDate(date);

  return new Date(dateObj.getTime() + getTimezoneOffset(timeZone, dateObj));
};

export const convertZonedTimeToUtc = (date: Date | string): Date => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const dateObj = convertDate(date);

  return new Date(dateObj.getTime() - getTimezoneOffset(timeZone, dateObj));
};
