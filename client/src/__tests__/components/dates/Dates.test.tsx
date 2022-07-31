import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { render, screen } from '@testing-library/react';
import Dates from '../../../components/dates/Dates';

describe('Dates component tests', () => {
  test('Dates renders', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dates />
      </LocalizationProvider>
    );
    const pickers = screen.getAllByTestId('dates-text-id');
    expect(pickers).toHaveLength(2);
  });
});
