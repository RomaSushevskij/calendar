import { DAYS_IN_WEEK, MS_IN_DAY } from 'components/Calendar/utils/constants';

export const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const passedDaysInYear = (date.getTime() - firstDayOfYear.getTime()) / MS_IN_DAY;

  return Math.ceil((passedDaysInYear + firstDayOfYear.getDay() + 1) / DAYS_IN_WEEK);
};