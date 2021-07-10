import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/users/userSlice';
import usersReducer from '../features/users/usersSlice';
import mobileMenuReducer from '../features/mobileMenu/mobileMenuSlice';


export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    mobileMenu: mobileMenuReducer,
  },
});

