import React, { memo } from 'react';

import style from './Calendar.module.scss';

import { useCalendar } from 'components/Calendar/hooks/useCalendar';
import { SwitchButton } from 'components/Calendar/SwitchButton/SwitchButton';
import { checkDateIsEqual } from 'components/Calendar/utils';
import { DAYS_IN_WEEK } from 'components/Calendar/utils/constants';
import { ReturnCreateDate } from 'components/Calendar/utils/types';
import { upFirstSymbol } from 'components/Calendar/utils/upFirstSymbol';
import { Nullable, ReturnComponent } from 'types';

type CalendarProps = {
  locale?: string;
  selectedDate: Nullable<Date>;
  selectDate: (date: Date) => void;
  selectedWeek: Nullable<Date[]>;
  selectWeek: (week: Date[]) => void;
};

export const Calendar = memo(
  ({
    locale,
    selectedDate,
    selectDate,
    selectedWeek,
    selectWeek,
  }: CalendarProps): ReturnComponent => {
    const { calendarState, calendarMethods } = useCalendar({
      selectedDate: new Date(),
      locale,
    });

    const { calendarDays, monthsNames, weekDaysNames, selectedMonth, selectedYear } =
      calendarState;
    const { commonCalendarDays, currentMonthCalendarDays } = calendarDays;
    const { setSelectedDate, onSwitchButtonClick } = calendarMethods;

    const currentMonth = upFirstSymbol(monthsNames[selectedMonth.monthIndex].month);

    const onDayClick = (currentDate: ReturnCreateDate) => () => {
      const currentDayIndex = currentMonthCalendarDays.findIndex(
        ({ dayNumber }) => dayNumber === currentDate.dayNumber,
      );
      const week = [...currentMonthCalendarDays]
        .splice(currentDayIndex, DAYS_IN_WEEK)
        .map(day => day.date);

      selectWeek(week);
      selectDate(currentDate.date);
      setSelectedDate(currentDate);
    };

    const weekDaysShortNames = weekDaysNames.map(({ dayShort }) => {
      return (
        <div key={dayShort} className={style.dayName}>
          {dayShort}
        </div>
      );
    });

    const monthDays = commonCalendarDays.map(date => {
      const { dayNumber, month, monthIndex } = date;

      const isDayOfCurrentMonth = selectedMonth.monthIndex === monthIndex;
      const isSelectedDate = checkDateIsEqual(date.date, selectedDate);
      const isDayOfSelectedWeek = selectedWeek?.includes(date.date);

      const dayClassName = isDayOfCurrentMonth
        ? `${style.dayNumber} ${style.currentMonthDayNumber}`
        : style.dayNumber;

      const selectedDayClassName = isSelectedDate
        ? `${dayClassName} ${style.selectedDay}`
        : dayClassName;

      const resultDayClassName = isDayOfSelectedWeek
        ? `${selectedDayClassName} ${style.selectedWeek}`
        : selectedDayClassName;

      return (
        <button
          type="button"
          key={dayNumber + month}
          className={resultDayClassName}
          onClick={onDayClick(date)}
          disabled={!isDayOfCurrentMonth}
        >
          {dayNumber}
        </button>
      );
    });

    return (
      <div className={style.calendar}>
        <div className={style.header}>
          <div className={style.monthAndYear}>
            <SwitchButton direction="prev" onClick={onSwitchButtonClick} />
            {`${currentMonth} ${selectedYear}`}
            <SwitchButton direction="next" onClick={onSwitchButtonClick} />
          </div>
          <div className={style.weekDaysNames}>{weekDaysShortNames}</div>
        </div>
        <div className={style.body}>{monthDays}</div>
      </div>
    );
  },
);
