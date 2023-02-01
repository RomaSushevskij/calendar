export type CreateDateParams = {
  locale?: string;
  date?: Date;
};
export type CreateMonthParams = CreateDateParams;
export type CreateYearParams = {
  year?: number;
  locale?: string;
  monthNumber?: number;
}