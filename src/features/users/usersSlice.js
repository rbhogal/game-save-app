import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '',
    name: '',
    accessToken: '',
    isSignedIn: true,
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { userAdded } = usersSlice.actions;

export default usersSlice.reducer;
