import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addSearchAsync = createAsyncThunk(
  'user/addSearchAsync',
  payload => {
    axios
      .put('https://game-save-default-rtdb.firebaseio.com/user.json', {
        search: payload,
      })
      // .then(console.log(`3) ${payload} added to database`))
      .catch(err => console.log(err.message));
  }
);

export const getSearchAsync = createAsyncThunk(
  'user/getSearchAsync',
  async () => {
    const resp = await axios.get(
      'https://game-save-default-rtdb.firebaseio.com/user.json'
    );
    // console.log(`received search:'${resp.data.search}' from database`);
    return resp.data.search;
  }
);

export const addNewUser = createAsyncThunk('user/addNewUser', async payload => {
  const resp = await axios.post(
    'https://game-save-default-rtdb.firebaseio.com/users/.json',
    {
      savedGames: [],
      userId: payload.userId,
      userName: payload.userName,
    }
  );

  const userKey = resp.data.name;
  return userKey;
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
        return {
          userKey: key,
          userData: users[key],
        };
      }
    }
  }
);

export const storeBookmark = createAsyncThunk(
  'user/storeBookmark',
  async payload => {
    await axios.post(
      `https://game-save-default-rtdb.firebaseio.com/users/${payload.key}/savedGames.json`,
      payload.game
    );
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async payload => {
  // get user key for current user
  const resp = await axios.get(
    'https://game-save-default-rtdb.firebaseio.com/users/.json'
  );
  const { data: users } = resp;

  for (const key in users) {
    if (users[key].userId === payload) {
      // delete user
      axios.delete(
        `https://game-save-default-rtdb.firebaseio.com/users/${key}/.json`
      );
    }
  }
});

const initialState = {
  userKey: null,
  userId: null,
  userName: null,
  userEmail: null,
  token: null,
  search: '',
  savedGames: {},
  isLoadingUserData: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoadingUserData: (state, action) => {
      state.isLoadingUserData = action.payload;
    },
    setActiveUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.token = action.payload.token;
    },
    setUserSignOutState: state => {
      state.userKey = null;
      state.userId = null;
      state.userName = null;
      state.userEmail = null;
      state.token = null;
      state.savedGames = {};
    },
  },
  extraReducers: {
    [getSearchAsync.fulfilled]: (state, action) => {
      // console.log(`5) Search, ${action.payload}, adding to state...`);
      state.search = action.payload;
      // console.log(`6) Search, ${action.payload}, added to state`);
    },
    [getSearchAsync.rejected]: () => {
      console.log('unable to retrieve search from database');
    },
    [addSearchAsync.fulfilled]: action => {
      return action.payload;
    },
    [getUserData.pending]: () => {},
    [getUserData.fulfilled]: (state, action) => {
      state.userKey = action.payload.userKey;
      state.userId = action.payload.userData.userId;
      state.savedGames = action.payload.userData.savedGames;
      state.isLoadingUserData = false;
    },
    [getUserData.rejected]: state => {
      console.log('Failed to retrieve use data');
      state.isLoadingUserData = false;
    },
    [addNewUser.pending]: () => {},
    [addNewUser.fulfilled]: (state, action) => {
      state.userKey = action.payload;
    },
    [addNewUser.rejected]: () => {
      console.log('Failed to add new user');
    },
  },
});

export const { setActiveUser, setUserSignOutState, setIsLoadingUserData } =
  userSlice.actions;

export const selectUserName = state => state.user.userName;
export const selectUserEmail = state => state.user.userEmail;
export const selectUserToken = state => state.user.token;
export const selectUserKey = state => state.user.userKey;
export const selectSavedGames = state => state.user.savedGames;
export const selectIsLoadingUserData = state => state.user.isLoadingUserData;

export default userSlice.reducer;
