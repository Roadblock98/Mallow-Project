// src/components/LoginPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../Login';


describe('LoginPage Component', () => {
  it('renders the login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/username/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy();
  });

  it('handles user input and login button click', () => {
    render(<LoginPage />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
  });
});
