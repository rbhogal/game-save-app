import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '',
    name: 'guest',
    accessToken: '',
    isSignedIn: '',
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action) {
      state.push(action.payload);
    },
    signOut(state, action) {
      const index = state.findIndex(user => user.id === action.payload.id);
      state[index].accessToken = '';
      state[index].isSignedIn = false;
    },
    signIn(state, action) {
      const index = state.findIndex((user) => user.id === action.payload.id);
      state[index].accessToken = action.payload.accessToken;
      state[index].isSignedIn = true; 
    }
  },
});

export const { userAdded, signOut, signIn } = usersSlice.actions;

export default usersSlice.reducer;
