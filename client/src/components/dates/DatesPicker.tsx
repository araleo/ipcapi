import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { getEarliestDate } from '../../utils/lib';

interface IProps {
  label: string;
  error: string;
  value: Date | null;
  setValue: (newValue: Date | null) => void;
}

const DatesPicker: React.FC<IProps> = ({ label, error, value, setValue }) => {
  return (
    <DatePicker
      openTo='month'
      views={['year', 'month']}
      label={label}
      value={value}
      minDate={getEarliestDate()}
      maxDate={new Date()}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error}
          data-testid='dates-text-id'
        />
      )}
    />
  );
};

export default DatesPicker;
