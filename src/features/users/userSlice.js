import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  userEmail: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.token = action.payload.token;
    },
    setUserSignOutState: state => {
      state.userName = null;
      state.userEmail = null;
      state.token = null; 
    },
  },
});

export const { setActiveUser, setUserSignOutState } = userSlice.actions;

export const selectUserName = state => state.user.userName;
export const selectUserEmail = state => state.user.userEmail;
export const selectUserToken = state => state.user.token;

export default userSlice.reducer;
