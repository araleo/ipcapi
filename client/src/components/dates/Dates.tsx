import { useState } from 'react';
import { ERRORS, LABELS } from '../../utils/constants';
import {
  getEarliestDate,
  getOneYearBefore,
  getOneYearLater,
} from '../../utils/lib';
import DatesPicker from './DatesPicker';
import styles from './Dates.module.css';

interface IProps {
  startDate: Date | null;
  setStartDate: (newDate: Date | null) => void;
  endDate: Date | null;
  setEndDate: (newDate: Date | null) => void;
}

const Dates: React.FC<IProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [startDateError, setStartDateError] = useState<string>('');
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
    <div className={styles.datesContainer}>
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
    </div>
  );
};

export default Dates;
