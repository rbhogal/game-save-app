import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import mobileMenuReducer from '../features/mobileMenu/mobileMenuSlice';
import appTokenReducer from '../features/admin/appTokenSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mobileMenu: mobileMenuReducer,
    admin: appTokenReducer, 
  },
});

