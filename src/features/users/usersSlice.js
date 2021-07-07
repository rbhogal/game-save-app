import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '',
    name: '',
    accessToken: '',
    isSignedIn: false,
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signIn(state, action) {
      state[0].id = action.payload.id;
      state[0].name = action.payload.name;
      state[0].accessToken = action.payload.accessToken;
      state[0].isSignedIn = true;
    },
    signOut(state, action) {
      const index = state.findIndex(user => user.id === action.payload.id);
      state[index].id = '';
      state[index].name = '';
      state[index].accessToken = '';
      state[index].isSignedIn = false;
    },
  },
});

export const { signIn, signOut } = usersSlice.actions;

export default usersSlice.reducer;
