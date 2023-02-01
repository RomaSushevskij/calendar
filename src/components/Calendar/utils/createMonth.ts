import { createDate } from 'components/Calendar/utils/createDate';
import { getDaysNumberOfMonth } from 'components/Calendar/utils/getDaysNumberOfMonth';
import {
  CreateMonthParams,
  ReturnCreateDate,
  ReturnCreateMonth,
} from 'components/Calendar/utils/types';

export const createMonth = (params?: CreateMonthParams): ReturnCreateMonth => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? 'default';

  const {
    month: monthName,
    monthIndex,
    monthNumber,
    year,
  } = createDate({ locale, date });

  const getDay = (dayNumber: number): ReturnCreateDate =>
    createDate({ date: new Date(year, monthIndex, dayNumber), locale });

  const createMonthDays = (): ReturnCreateDate[] => {
    const days: ReturnType<typeof createDate>[] = [];

    for (let i = 0; i < getDaysNumberOfMonth(monthIndex, year); i += 1) {
      days[i] = getDay(i + 1);
    }

    return days;
  };

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    createMonthDays,
  };
};
