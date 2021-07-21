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

export const addNewUser = createAsyncThunk('user/addNewUser', async payload => {
  const resp = await axios.post(
    'https://game-save-default-rtdb.firebaseio.com/users/.json',
    {
      userId: payload,
      savedGames: [],
    }
  );

  const data = await resp;
});

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async payload => {
    const resp = await axios.get(
      'https://game-save-default-rtdb.firebaseio.com/users/.json'
    );
    const { data: users } = await resp;
    for (const key in users) {
      if (users[key].userId === payload) {
        return users[key];
      }
    }
  }
);

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  const resp = await axios.get(
    'https://game-save-default-rtdb.firebaseio.com/users/.json'
  );
  const { data: users } = await resp;
  return users;
});

const initialState = {
  userId: null,
  userName: null,
  userEmail: null,
  token: null,
  search: '',
  savedGames: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.token = action.payload.token;
    },
    setUserSignOutState: state => {
      state.userId = null;
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
    [getUserData.fulfilled]: (state, action) => {
      state.userId = action.payload.userId;
      state.savedGames = action.payload.savedGames;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      return action.payload;
    }
  },
});

export const { setActiveUser, setUserSignOutState } = userSlice.actions;

export const selectUserName = state => state.user.userName;
export const selectUserEmail = state => state.user.userEmail;
export const selectUserToken = state => state.user.token;

export default userSlice.reducer;
