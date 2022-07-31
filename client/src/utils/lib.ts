export const getEarliestDate = () => {
  return new Date(1980, 0, 1);
};

export const getOneYearBefore = (startDate?: Date | null) => {
  const _date = startDate ? startDate : new Date();
  const lastYear = new Date(
    _date.getFullYear() - 1,
    _date.getMonth() + 1,
    1
  );
  return lastYear;
};

export const getOneYearLater = (startDate?: Date | null) => {
  const _date = startDate ? startDate : new Date();
  const lastYear = new Date(
    _date.getFullYear() + 1,
    _date.getMonth(),
    1
  );
  return lastYear;
};

