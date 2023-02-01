import { Nullable } from 'types';

export const checkDateIsEqual = (
  date1: Nullable<Date>,
  date2: Nullable<Date>,
): boolean => {
  if (date1 && date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  return false;
};
