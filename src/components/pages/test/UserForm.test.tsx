// src/components/UserForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../UserForm';

describe('UserForm Component', () => {
  it('renders the user form', () => {
    render(<UserForm />);
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /submit/i })).toBeTruthy();
  });

  it('validates form input and calls submit handler', () => {
    const mockSubmit = jest.fn();
    render(<UserForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({ name: 'Alice' });
  });
});
