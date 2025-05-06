import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders elements', () => {
    render(<App />);

    expect(screen.queryByText('Tip Amount')).toBeVisible();
    expect(screen.queryByText('Select Tip %')).toBeVisible();
  });
});

  