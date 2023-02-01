import { createDate } from 'components/Calendar/utils/createDate';

export type CreateDateParams = {
  locale?: string;
  date?: Date;
};
export type ReturnCreateDate = {
  date: Date;
  dayNumber: number;
  day: string;
  dayShort: string;
  dayNumberInWeek: number;
  weekNumber: number;
  month: string;
  monthShort: string;
  monthNumber: number;
  monthIndex: number;
  year: number;
  yearShort: string;
  time: number;
};
export type CreateMonthParams = CreateDateParams;
export type ReturnCreateMonth = {
  getDay: (dayNumber: number) => ReturnCreateDate;
  monthName: string;
  monthIndex: number;
  monthNumber: number;
  year: number;
  createMonthDays: () => ReturnCreateDate[];
};
export type CreateYearParams = {
  year?: number;
  locale?: string;
  monthNumber?: number;
};
export type ReturnCreateYear = {
  createYearMonths: () => ReturnCreateDate[][];
  month: ReturnCreateMonth;
  year: number;
};
export type MonthNames = {
  month: ReturnType<typeof createDate>['month'];
  monthIndex: ReturnType<typeof createDate>['monthIndex'];
  date: ReturnType<typeof createDate>['date'];
};
export type WeekDayName = {
  day: ReturnType<typeof createDate>['day'];
  dayShort: ReturnType<typeof createDate>['dayShort'];
};
