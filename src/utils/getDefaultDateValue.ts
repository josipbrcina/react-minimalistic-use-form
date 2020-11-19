export const getDefaultDateValue = (currentDate?: Date): string => {
  const date = currentDate ?? new Date();

  let day: number | string = date.getDate();
  let month: number | string = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${year}-${month}-${day}`;
};
