import { Reducer } from 'redux';
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

const usersReducer: Reducer<UsersState, any> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, loading: false, users: action.payload };
    case 'FETCH_USERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_USER_SUCCESS':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default usersReducer;
