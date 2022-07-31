import React from 'react';
import DatePicker from './components/dates/DatePicker';
import Header from './components/header/Header';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Header />
      <DatePicker />
    </LocalizationProvider>
  );
};

export default App;
