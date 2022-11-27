// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Api Imports
import api from '@apis/index';

// ** Imports IF User
import {
  IUserParams,
  IUserResponse
} from '@src/models/IUser';

// ** Imports constants
import { USER } from '@src/constants';

interface IFUserState {
  message?: string
  user?: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
  }
  errorCode?: string
  loading: boolean
}

const initialState: IFUserState = {
  message: undefined,
  user: undefined,
  errorCode: undefined,
  loading: false
};

export const addUserApi = createAsyncThunk<any, IUserParams>(USER.ACTION_TYPES.ADD_USER, async (user, thunkAPI) => {
  try {
    const response: IUserResponse = await api.addUserApi(user);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const appUsersSlice = createSlice({
  name: 'appRegister',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addUserApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;
        state.loading = false;

        if (action.payload.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
        } else {
          state.user = action.payload?.data?.user;
        }
      })
      .addCase(addUserApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
        state.loading = false;
      });
  }
});

export default appUsersSlice.actions;
