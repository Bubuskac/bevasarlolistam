import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Bevásárlólistám header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Bevásárlólistám/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders login form', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Bejelentkezés/i);
  expect(linkElement).toBeInTheDocument();
});
