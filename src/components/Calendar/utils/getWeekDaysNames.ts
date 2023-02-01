import { createDate } from 'components/Calendar/utils/createDate';
import { DAYS_IN_WEEK } from 'components/Calendar/utils/constants';

type WeekDayName = {
  day: ReturnType<typeof createDate>['day'];
  dayShort: ReturnType<typeof createDate>['dayShort'];
}

export const getWeekDaysNames = (locale: string = 'default') => {
  const weekDaysNames: WeekDayName[] = Array.from({ length: DAYS_IN_WEEK });

  const currentDate = new Date();

  weekDaysNames.forEach((_, i) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i),
      locale,
    });

    weekDaysNames[dayNumberInWeek] = { day, dayShort };
  });
  return [...weekDaysNames.slice(1), ...weekDaysNames.slice(0, 1)];
};