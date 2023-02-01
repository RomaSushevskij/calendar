import { useMemo, useState } from 'react';
import {
  createDate,
  createMonth,
  getDaysNumberOfMonth,
  getMonthsNames,
  getWeekDaysNames,
} from 'components/Calendar/utils';

type UseCalendarParams = {
  locale?: string;
  selectedDate: Date;
}

export const useCalendar = ({ locale = 'default', selectedDate: date }: UseCalendarParams) => {
  const [selectedDate, setSelectedDate] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(createMonth({
    date: new Date(selectedDate.year, selectedDate.monthIndex),
    locale,
  }));
  const [selectedYear, setSelectedYear] = useState(selectedDate.year);

  const monthsNames = useMemo(() => getMonthsNames(locale), []);
  const weekDaysNames = useMemo(() => getWeekDaysNames(locale), []);
  const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth]);
  const calendarDays = useMemo(() => {
    const daysNumbersOfMonth = getDaysNumberOfMonth(selectedDate.monthIndex, selectedYear);

    const start = days[0].dayNumberInWeek === 0 ? 6 : days[0].dayNumberInWeek - 1;
    const end = Math.abs(7 - days[days.length - 1].dayNumberInWeek);
    console.log(days[0]);
    console.log(days[days.length - 1]);
    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);


  return {
    calendarState: {
      selectedDate,
      selectedMonth,
      selectedYear,
      monthsNames,
      weekDaysNames,
      days,
    },
  };
};