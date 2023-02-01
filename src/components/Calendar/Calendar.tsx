import React, { memo } from 'react';
import style from './Calendar.module.scss';
import { upFirstSymbol } from 'components/Calendar/utils/upFirstSymbol';
import { useCalendar } from 'components/Calendar/hooks/useCalendar';

type CalendarProps = {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
}

export const Calendar = memo(({ selectedDate, locale }: CalendarProps) => {
  const { calendarState } = useCalendar({ selectedDate, locale });
  const { days, monthsNames, weekDaysNames, selectedMonth, selectedYear } = calendarState;
  const currentMonth = upFirstSymbol(monthsNames[selectedMonth.monthIndex].month);

  const weekDays = weekDaysNames.map(({ dayShort }) => {
    return <div key={dayShort} className={style.dayName}>{dayShort}</div>;
  });

  return (
    <div className={style.calendar}>
      <div className={style.header}>
        <div className={style.monthAndYear}>{`${currentMonth} ${selectedYear}`}</div>
        <div className={style.weekDaysNames}>
          {weekDays}
        </div>
      </div>
      <div className={style.body}>
        {days.map(({ dayNumber, day }) => <div key={dayNumber + day}
                                               className={style.dayNumber}>{dayNumber}</div>)}
      </div>

    </div>
  );
});