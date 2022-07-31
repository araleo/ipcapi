import React from 'react';
import Header from './components/header/Header';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Dates from './components/dates/Dates';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Header />
      <Dates />
    </LocalizationProvider>
  );
};

export default App;
