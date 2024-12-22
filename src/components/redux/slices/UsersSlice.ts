import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from '../../../../mockData.json';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: mockData,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index >= 0) {
        state.users[index] = action.payload;
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUser,
  updateUser,
  deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;
