export const getDefaultDateValue = (currentDate?: Date): string => {
  const date = currentDate ?? new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const parsedMonth = month < 10 ? `0${month}` : month;
  const parsedDay = day < 10 ? `0${day}` : day;

  return `${year}-${parsedMonth}-${parsedDay}`;
};
