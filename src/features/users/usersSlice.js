import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { users: {} };

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  const resp = await axios.get(
    'https://game-save-default-rtdb.firebaseio.com/users/.json'
  );
  const { data: users } = await resp;
  return users;
});

export const getUserDataAsync = createAsyncThunk(
  'users/getUserDataAsync',
  async key => {
    try {
      const data = await axios.get(
        `https://game-save-default-rtdb.firebaseio.com/users/${key}.json`
      );
      return { data };
    } catch (err) {
      console.log(err);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signIn(state, action) {
      state[0].id = action.payload.id;
      state[0].name = action.payload.name;
      state[0].accessToken = action.payload.accessToken;
      state[0].isSignedIn = action.payload.isSignedIn;
    },
    signOut(state, action) {
      const index = state.findIndex(user => user.id === action.payload.id);
      state[index].id = '';
      state[index].name = '';
      state[index].accessToken = '';
      state[index].isSignedIn = false;
    },
  },
  extraReducers: {
    [getUserDataAsync.fulfilled]: (state, action) => {
      return action.payload.data;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { signIn, signOut } = usersSlice.actions;

export default usersSlice.reducer;
