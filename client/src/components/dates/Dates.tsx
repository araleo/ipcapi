import { useState } from 'react';
import { ERRORS, LABELS } from '../../utils/constants';
import {
  getEarliestDate,
  getOneYearBefore,
  getOneYearLater,
} from '../../utils/lib';
import DatesPicker from './DatesPicker';

const Dates = () => {
  const [startDate, setStartDate] = useState<Date | null>(getOneYearBefore());
  const [startDateError, setStartDateError] = useState<string>('');
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [endDateError, setEndDateError] = useState<string>('');
  const [dualError, setDualError] = useState<string>('');

  const handleStartDateChange = (newValue: Date | null) => {
    if (newValue !== null) {
      checkStartDateError(newValue);
    }
    setStartDate(newValue);
  };

  const checkStartDateError = (newValue: Date) => {
    if (newValue < getEarliestDate()) {
      setStartDateError(ERRORS.minStartDate);
    } else if (newValue < getOneYearBefore(endDate)) {
      setDualError(ERRORS.intervalTooBig);
    } else if (endDate !== null && newValue > endDate) {
      setStartDateError(ERRORS.startBeforeEnd);
    } else {
      setDualError('');
      setStartDateError('');
    }
  };

  const handleEndDateChange = (newValue: Date | null) => {
    if (newValue !== null) {
      checkEndDateError(newValue);
    }
    setEndDate(newValue);
  };

  const checkEndDateError = (newValue: Date) => {
    if (newValue > new Date()) {
      setEndDateError(ERRORS.noFuture);
    } else if (newValue > getOneYearLater(startDate)) {
      setDualError(ERRORS.intervalTooBig);
    } else if (startDate !== null && newValue < startDate) {
      setEndDateError(ERRORS.endAfterStart);
    } else {
      setDualError('');
      setEndDateError('');
    }
  };

  return (
    <>
      <DatesPicker
        label={LABELS.startDate}
        error={dualError || startDateError}
        value={startDate}
        setValue={handleStartDateChange}
      />
      <DatesPicker
        label={LABELS.endDate}
        error={dualError || endDateError}
        value={endDate}
        setValue={handleEndDateChange}
      />
    </>
  );
};

export default Dates;
