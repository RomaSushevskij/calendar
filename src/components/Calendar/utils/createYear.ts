import { CreateYearParams } from 'components/Calendar/utils/types';
import { createDate } from 'components/Calendar/utils/createDate';
import { createMonth } from 'components/Calendar/utils/createMonth';
import { MONTHS_IN_YEAR } from 'components/Calendar/utils/constants';

export const createYear = (params?: CreateYearParams) => {
  const locale = params?.locale ?? 'default';

  const today = createDate();

  const year = params?.year ?? today.year;
  const monthNumber = params?.monthNumber ?? today.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });
  const getMonthDays = (monthIndex: number) => createMonth({
    date: new Date(year, monthIndex),
    locale,
  }).createMonthDays();

  const createYearMonths = () => {
    const months = [];

    for (let i = 0; i < MONTHS_IN_YEAR; i += 1) {
      months[i] = getMonthDays(i);
    }

    return months;
  };

  return {
    createYearMonths,
    month,
    year,
  };
};