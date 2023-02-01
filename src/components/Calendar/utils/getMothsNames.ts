import { MONTHS_IN_YEAR } from 'components/Calendar/utils/constants';
import { createDate } from 'components/Calendar/utils/createDate';
import { MonthNames } from 'components/Calendar/utils/types';

export const getMonthsNames = (locale: string = 'default'): MonthNames[] => {
  const monthsNames: MonthNames[] = Array.from({ length: MONTHS_IN_YEAR });

  const currentDate = new Date();

  monthsNames.forEach((_, i) => {
    const { month, monthIndex, date } = createDate({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1),
      locale,
    });

    monthsNames[monthIndex] = { month, monthIndex, date };
  });

  return monthsNames;
};
