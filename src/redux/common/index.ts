import Cookies from 'js-cookie';

// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ** Imports constants
import {
  COMMON_ACTION_TYPES,
  ACCESS_TOKEN,
  USERNAME_COOKIE
} from '@src/constants';

import { IDataTokenUserParams } from '@models/ICommon';

interface IFAccessTokenState {
  accessToken: string | null
  username: string | null
  navigateTo: boolean,
  loggedIn: boolean
}

const initialState: IFAccessTokenState = {
  accessToken: null,
  username: null,
  navigateTo: false,
  loggedIn: false
};

export const setAccessTokenUsernameCookie = createAsyncThunk<any, IDataTokenUserParams>(COMMON_ACTION_TYPES.SET_TOKEN, async (params, thunkAPI) => {
  try {
    Cookies.set(ACCESS_TOKEN, params.accessToken, { expires: 7 });
    Cookies.set(USERNAME_COOKIE, params.username, { expires: 7 });

    return {
      ...params,
      loggedIn: true,
      navigateTo: true
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getAccessTokenUsernameCookie = createAsyncThunk<any>(COMMON_ACTION_TYPES.GET_TOKEN, async (_, thunkAPI) => {
  try {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    const username = Cookies.get(USERNAME_COOKIE);

    if (accessToken && username) {
      return {
        username,
        accessToken,
        navigateTo: true,
        loggedIn: true
      };
    } else {
      return {
        accessToken: null,
        username: null,
        navigateTo: false,
        loggedIn: false
      };
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const removeAccessTokenUsernameCookie = createAsyncThunk<any>(COMMON_ACTION_TYPES.REMOVE_TOKEN, async (_, thunkAPI) => {
  try {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(USERNAME_COOKIE);

    return {
      accessToken: null,
      username: null,
      navigateTo: false,
      loggedIn: false
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const appCommonSlice = createSlice({
  name: 'appCommon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setAccessTokenUsernameCookie.fulfilled, (state, action:PayloadAction<any>) => {
        state.accessToken = action.payload.accessToken;
        state.username = action.payload.username;
        state.loggedIn = action.payload.loggedIn;
        state.navigateTo = action.payload.navigateTo;
      })
      .addCase(getAccessTokenUsernameCookie.fulfilled, (state, action:PayloadAction<any>) => {
        state.accessToken = action.payload.accessToken;
        state.username = action.payload.username;
        state.loggedIn = action.payload.loggedIn;
        state.navigateTo = action.payload.navigateTo;
      })
      .addCase(removeAccessTokenUsernameCookie.fulfilled, (state, action:PayloadAction<any>) => {
        state.accessToken = action.payload.accessToken;
        state.username = action.payload.username;
        state.loggedIn = action.payload.loggedIn;
        state.navigateTo = action.payload.navigateTo;
      });
  }
});

export default appCommonSlice.actions;
