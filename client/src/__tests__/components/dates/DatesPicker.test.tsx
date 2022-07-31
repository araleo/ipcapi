import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { render, screen } from '@testing-library/react';
import DatesPicker from '../../../components/dates/DatesPicker';

describe('DatesPicker component tests', () => {
  test('DatesPicker renders', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatesPicker
          label={'test'}
          error={''}
          value={new Date()}
          setValue={jest.fn()}
        />
      </LocalizationProvider>
    );
    const pickers = screen.getAllByTestId('dates-text-id');
    expect(pickers).toHaveLength(1);
  });
});
