import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/users/userSlice';
import usersReducer from '../features/users/usersSlice';
import mobileMenuReducer from '../features/mobileMenu/mobileMenuSlice';
import appTokenReducer from '../features/admin/appTokenSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    mobileMenu: mobileMenuReducer,
    admin: appTokenReducer, 
  },
});

