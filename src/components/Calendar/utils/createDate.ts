import { getWeekNumber } from 'components/Calendar/utils/getWeekNumber';
import { CreateDateParams } from 'components/Calendar/utils/types';


export const createDate = (params?: CreateDateParams) => {
  const locale = params?.locale ?? 'default';
  const date = params?.date ?? new Date();

  const dayNumber = date.getDate();
  const day = date.toLocaleDateString(locale, { weekday: 'long' });
  const dayShort = date.toLocaleDateString(locale, { weekday: 'short' });
  const dayNumberInWeek = date.getDay();
  const weekNumber = getWeekNumber(date);
  const month = date.toLocaleDateString(locale, { month: 'long' });
  const monthShort = date.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = date.getMonth() + 1;
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const yearShort = date.toLocaleDateString(locale, { year: '2-digit' });
  const time = date.getTime();

  return {
    date,
    dayNumber,
    day,
    dayShort,
    dayNumberInWeek,
    weekNumber,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    year,
    yearShort,
    time,
  };
};
