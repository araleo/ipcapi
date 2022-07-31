import { render, screen } from '@testing-library/react';
import Header from '../../../components/header/Header';

describe('Header component tests', () => {
  test('Header renders', () => {
    render(<Header />);
    const title = screen.getByText('IPCAPI');
    const subtitle = screen.getByText(
      'Consulte o IPCA em um período personalizado'
    );
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });
});
