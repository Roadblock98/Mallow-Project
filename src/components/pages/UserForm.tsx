import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { updateUser, createUser } from '../redux/slices/UsersSlice';

const UserForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const editingUser = id ? users.find((user: any) => user.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    first_name: editingUser?.first_name || '',
    last_name: editingUser?.last_name || '',
    email: editingUser?.email || '',
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
      });
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser({ ...editingUser, ...formData }));
    } else {
      const newUser = { id: Date.now(), ...formData };
      dispatch(createUser(newUser));
    }
    navigate('/');
  };

  return (
    <div>
      <h1>{editingUser ? 'Edit User' : 'Create User'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{editingUser ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserForm;
