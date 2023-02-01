import { useCallback, useMemo, useState } from 'react';

import {
  createDate,
  createMonth,
  getMonthsNames,
  getWeekDaysNames,
} from 'components/Calendar/utils';
import {
  DAYS_IN_WEEK,
  INDEX_OF_LAST_DAY_IN_WEEK,
  MONTHS_IN_YEAR,
} from 'components/Calendar/utils/constants';
import {
  MonthNames,
  ReturnCreateDate,
  ReturnCreateMonth,
  WeekDayName,
} from 'components/Calendar/utils/types';

type UseCalendarParams = {
  locale?: string;
  selectedDate: Date;
};

type ReturnUseCalendar = {
  calendarState: {
    selectedDate: ReturnCreateDate;
    selectedMonth: ReturnCreateMonth;
    selectedYear: number;
    monthsNames: MonthNames[];
    weekDaysNames: WeekDayName[];
    calendarDays: {
      commonCalendarDays: ReturnCreateDate[];
      currentMonthCalendarDays: ReturnCreateDate[];
    };
  };
  calendarMethods: {
    setSelectedDate: (date: ReturnCreateDate) => void;
    onSwitchButtonClick: (direction: 'next' | 'prev') => void;
  };
};

export const useCalendar = ({
  locale = 'default',
  selectedDate: date,
}: UseCalendarParams): ReturnUseCalendar => {
  const [selectedDate, setSelectedDate] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDate.year, selectedDate.monthIndex),
      locale,
    }),
  );
  const [selectedYear, setSelectedYear] = useState(selectedDate.year);

  const monthsNames = useMemo(() => getMonthsNames(locale), [locale]);
  const weekDaysNames = useMemo(() => getWeekDaysNames(locale), [locale]);
  const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth]);
  const calendarDays = useMemo(() => {
    const prevMonthDaysCount =
      days[0].dayNumberInWeek === 0
        ? INDEX_OF_LAST_DAY_IN_WEEK
        : days[0].dayNumberInWeek - 1;

    const nextMonthDaysCount =
      days[days.length - 1].dayNumberInWeek === 0
        ? 0
        : DAYS_IN_WEEK - days[days.length - 1].dayNumberInWeek;

    const fullPrevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const fullNextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const partOfPrevMonthDays = fullPrevMonthDays.slice(
      fullPrevMonthDays.length - prevMonthDaysCount,
      fullPrevMonthDays.length,
    );

    const partOfNextMonthDays = fullNextMonthDays.slice(0, nextMonthDaysCount);

    return {
      commonCalendarDays: [...partOfPrevMonthDays, ...days, ...partOfNextMonthDays],
      currentMonthCalendarDays: days,
    };
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear, days, locale]);

  const onSwitchButtonClick = useCallback(
    (direction: 'next' | 'prev'): void => {
      const monthIndex =
        direction === 'prev'
          ? selectedMonth.monthIndex - 1
          : selectedMonth.monthIndex + 1;

      if (monthIndex < 0) {
        const prevYear = selectedYear - 1;

        setSelectedYear(prevYear);

        return setSelectedMonth(
          createMonth({ date: new Date(prevYear, MONTHS_IN_YEAR - 1), locale }),
        );
      }

      if (monthIndex === MONTHS_IN_YEAR) {
        const nextYear = selectedYear + 1;

        setSelectedYear(nextYear);

        return setSelectedMonth(createMonth({ date: new Date(nextYear, 0), locale }));
      }

      setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
    },
    [selectedMonth.monthIndex, selectedYear, locale],
  );

  return {
    calendarState: {
      selectedDate,
      selectedMonth,
      selectedYear,
      monthsNames,
      weekDaysNames,
      calendarDays,
    },
    calendarMethods: {
      setSelectedDate,
      onSwitchButtonClick,
    },
  };
};
