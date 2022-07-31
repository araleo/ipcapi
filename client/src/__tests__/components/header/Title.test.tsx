import { render, screen } from '@testing-library/react';
import Title from '../../../components/header/Title';

describe('Title component tests', () => {
  test('Title renders', () => {
    render(<Title />);
    const title = screen.getByText('IPCAPI');
    expect(title).toBeInTheDocument();
  });
});