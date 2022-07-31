export const TITLE = 'IPCAPI';

export const SUBTITLE = 'Consulte o IPCA em um período personalizado';

export const LABELS = {
  date: 'Data',
  endDate: 'Data de término',
  startDate: 'Data de início',
  sum: 'Soma',
  value: 'Valor',
};

export const MESSAGES = {
  error: 'Ocorreu um erro inesperado',
  loading: 'Carregando...',
  tooltip: 'Nossos dados são extraídos diariamente da API do BCB.',
};

export const ERRORS = {
  endAfterStart: 'Data final deve ser posterior a inicial',
  intervalTooBig: 'O intervalo deve ser de no máximo um ano',
  minStartDate: 'A Data inicial deve ser posterior a 01/01/1980',
  noFuture: 'A data não pode ser no futuro',
  startBeforeEnd: 'Data inicial deve ser anterior a final',
};

export const COLORS = {
  detail: '#025C75',
  grey: '#D9D9D9',
};
