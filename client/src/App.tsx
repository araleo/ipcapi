import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Dates from './components/dates/Dates';
import IpcaTable, { IpcaData } from './components/table/IpcaTable';
import useHttp from './hooks/use-http';
import { formatDate, getOneYearBefore } from './utils/lib';
import { Typography } from '@mui/material';
import { MESSAGES } from './utils/constants';

interface IpcaResponse {
  soma: number;
  data: IpcaData[];
}

const App = () => {
  const [startDate, setStartDate] = useState<Date | null>(getOneYearBefore());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [ipcaData, setIpcaData] = useState<IpcaData[]>([]);
  const [ipcaSum, setIpcaSum] = useState<number | null>(null);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const setIpca = (res: IpcaResponse) => {
      setIpcaSum(res.soma);
      setIpcaData(res.data);
    };

    if (startDate !== null && endDate !== null) {
      sendRequest(
        {
          url: 'http://localhost:8000/ipca',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: { start: formatDate(startDate), end: formatDate(endDate) },
        },
        setIpca
      );
    }
  }, [sendRequest, startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Header />
      <Dates
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {isLoading && <Typography>{MESSAGES.loading}</Typography>}
      {error && <Typography>{MESSAGES.error}</Typography>}
      {!isLoading && !error && (
        <IpcaTable ipcaData={ipcaData} ipcaSum={ipcaSum} />
      )}
    </LocalizationProvider>
  );
};

export default App;
