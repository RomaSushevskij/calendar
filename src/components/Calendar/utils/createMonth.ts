import { getDaysNumberOfMonth } from 'components/Calendar/utils/getDaysNumberOfMonth';
import { CreateMonthParams } from 'components/Calendar/utils/types';
import { createDate } from 'components/Calendar/utils/createDate';


export const createMonth = (params?: CreateMonthParams) => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? 'default';

  const { month: monthName, monthIndex, monthNumber, year } = createDate({ locale, date });

  const getDay = (dayNumber: number) => createDate({ date: new Date(year, monthIndex, dayNumber), locale });

  const createMonthDays = () => {
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