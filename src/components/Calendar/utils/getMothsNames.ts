import { createDate } from 'components/Calendar/utils/createDate';
import { MONTHS_IN_YEAR } from 'components/Calendar/utils/constants';

type MonthNames = {
  month: ReturnType<typeof createDate>['month'];
  monthIndex: ReturnType<typeof createDate>['monthIndex'];
  date: ReturnType<typeof createDate>['date'];
}

export const getMonthsNames = (locale: string = 'default') => {
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