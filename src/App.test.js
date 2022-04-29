import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkEl = screen.getByText(/picture of the day/i);
  expect(linkEl).toBeInTheDocument();
});