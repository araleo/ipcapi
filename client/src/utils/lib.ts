export const getEarliestDate = () => {
  return new Date(1980, 0, 1);
};

export const getOneYearBefore = (startDate?: Date | null) => {
  const _date = startDate ? startDate : new Date();
  const lastYear = new Date(_date.getFullYear() - 1, _date.getMonth() + 1, 1);
  return lastYear;
};

export const getOneYearLater = (startDate?: Date | null) => {
  const _date = startDate ? startDate : new Date();
  const lastYear = new Date(_date.getFullYear() + 1, _date.getMonth(), 1);
  return lastYear;
};

export const formatDate = (_date: Date) => {
  return _date.toLocaleDateString('pt-BR');
};

export const parseDate = (_date: string) => {
  const [year, month, _] = _date.split('-');
  return `${month}/${year}`;
};
