import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../features/users/usersSlice';
import mobileMenuReducer from '../features/mobileMenu/mobileMenuSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    mobileMenu: mobileMenuReducer,
  },
});
