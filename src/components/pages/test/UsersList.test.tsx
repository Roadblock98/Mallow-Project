// src/components/UsersList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import UsersList from '../UsersList';

describe('UsersList Component', () => {
  it('renders a list of users', () => {
    render(<UsersList />);
    expect(screen.getByText(/alice/i)).toBeTruthy();
    expect(screen.getByText(/bob/i)).toBeTruthy();
  });

  it('calls edit and delete functions', () => {
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();
    render(<UsersList />);

    fireEvent.click(screen.getByText(/edit alice/i));
    fireEvent.click(screen.getByText(/delete bob/i));

    expect(mockEdit).toHaveBeenCalledWith(1);
    expect(mockDelete).toHaveBeenCalledWith(2);
  });
});
