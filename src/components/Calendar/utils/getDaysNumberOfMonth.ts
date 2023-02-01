export const getDaysNumberOfMonth = (
  monthIndex: number,
  yearNumber: number = new Date().getFullYear()
) => {
  return new Date(yearNumber, monthIndex + 1, 0).getDate();
};