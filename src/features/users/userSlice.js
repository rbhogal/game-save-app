import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addSearchAsync = createAsyncThunk(
  'user/addSearchAsync',
  payload => {
    axios
      .put('https://game-save-default-rtdb.firebaseio.com/user.json', {
        search: payload,
      })
      .then(console.log(`3) ${payload} added to database`))
      .catch(err => console.log(err.message));
  }
);

export const getSearchAsync = createAsyncThunk(
  'user/getSearchAsync',
  async () => {
    const resp = await axios.get(
      'https://game-save-default-rtdb.firebaseio.com/user.json'
    );
    console.log(`received search:'${resp.data.search}' from database`);
    return resp.data.search;
  }
);

const initialState = {
  userName: null,
  userEmail: null,
  token: null,
  search: '',
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
  extraReducers: {
    [getSearchAsync.fulfilled]: (state, action) => {
      console.log(`5) Search, ${action.payload}, adding to state...`);
      state.search = action.payload;
      console.log(`6) Search, ${action.payload}, added to state`);
    },
    [getSearchAsync.rejected]: (state, action) => {
      console.log('unable to retrieve search from database');
    },
    [addSearchAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActiveUser, setUserSignOutState } = userSlice.actions;

export const selectUserName = state => state.user.userName;
export const selectUserEmail = state => state.user.userEmail;
export const selectUserToken = state => state.user.token;

export default userSlice.reducer;
