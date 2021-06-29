import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false
};

const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    isOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { isOpen } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
