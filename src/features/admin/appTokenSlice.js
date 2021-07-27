import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isLoading: true,
};

const appTokenSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addAppToken(state, action) {
      state.token = action.payload.token;
    },
    addLoadingState(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { addAppToken, addLoadingState } = appTokenSlice.actions;

export const selectAppToken = state => state.admin.token;
export const selectIsLoading = state => state.admin.isLoading;

export default appTokenSlice.reducer;
