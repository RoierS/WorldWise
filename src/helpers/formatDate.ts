import { DateType } from '@/interfaces/DateType';

export const formatDate = (date: DateType) => {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));
};
