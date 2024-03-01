import dayjs from 'dayjs';

export const dateFormate = {
  dateFromString(value: string) {
    return dayjs(value).format('DD-MM-YYYY');
  },
  getCountDays(start: string, end: string) {
    return dayjs(end).date() - dayjs(start).date();
  },
};
