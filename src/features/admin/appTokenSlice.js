import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '',
}

const appTokenSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAppToken(state, action) {
           state.token = action.payload.token;
        }
    },
});

export const {
    addAppToken
} = appTokenSlice.actions

export const selectAppToken = state => state.admin.token;

export default appTokenSlice.reducer