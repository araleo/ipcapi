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
import Download from './components/download/Download';

interface IpcaResponse {
  soma: number;
  data: IpcaData[];
}

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://3.16.137.212:8000/ipca'
    : 'http://localhost:8000/ipca';

const App = () => {
  const [startDate, setStartDate] = useState<Date | null>(getOneYearBefore());
  const [startDateError, setStartDateError] = useState<string>('');
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [endDateError, setEndDateError] = useState<string>('');
  const [dualError, setDualError] = useState<string>('');
  const [ipcaData, setIpcaData] = useState<IpcaData[]>([]);
  const [ipcaSum, setIpcaSum] = useState<number | null>(null);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const setIpca = (res: IpcaResponse) => {
      setIpcaSum(res.soma);
      setIpcaData(res.data);
    };

    const hasError = !!startDateError || !!endDateError || !!dualError;
    if (startDate !== null && endDate !== null && !hasError) {
      sendRequest(
        {
          url: API_URL,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: { start: formatDate(startDate), end: formatDate(endDate) },
        },
        setIpca
      );
    }
  }, [
    sendRequest,
    startDate,
    endDate,
    startDateError,
    endDateError,
    dualError,
  ]);

  const handleDownload = () => {
    const downloadExcel = (res: any) => {
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ipca.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode!.removeChild(link);
    };

    const hasError = !!startDateError || !!endDateError || !!dualError;
    if (startDate !== null && endDate !== null && !hasError) {
      sendRequest(
        {
          url: API_URL + '?format=xlsx',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: { start: formatDate(startDate), end: formatDate(endDate) },
          noJson: true,
        },
        downloadExcel
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Header />
      <Dates
        startDate={startDate}
        setStartDate={setStartDate}
        startDateError={startDateError}
        setStartDateError={setStartDateError}
        endDate={endDate}
        setEndDate={setEndDate}
        endDateError={endDateError}
        setEndDateError={setEndDateError}
        dualError={dualError}
        setDualError={setDualError}
      />
      <Download handleDownload={handleDownload} />
      {isLoading && <Typography>{MESSAGES.loading}</Typography>}
      {error && <Typography>{MESSAGES.error}</Typography>}
      {!isLoading && !error && (
        <IpcaTable ipcaData={ipcaData} ipcaSum={ipcaSum} />
      )}
    </LocalizationProvider>
  );
};

export default App;
