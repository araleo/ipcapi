export const TITLE = 'IPCAPI';

export const SUBTITLE = 'Consulte o IPCA em um período personalizado';

export const LABELS = {
  endDate: 'Data de término',
  startDate: 'Data de início',
};

export const ERRORS = {
  endAfterStart: 'Data final deve ser posterior a inicial',
  intervalTooBig: 'O intervalo deve ser de no máximo um ano',
  minStartDate: 'A Data inicial deve ser posterior a 01/01/1980',
  noFuture: 'A data não pode ser no futuro',
  startBeforeEnd: 'Data inicial deve ser anterior a final',
};
