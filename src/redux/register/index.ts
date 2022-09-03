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
  message: string | null
  status: number | null
  successfully: boolean
  errorCode: string | null
  loading: boolean
}

const initialState: IFUserState = {
  message: null,
  status: null,
  successfully: false,
  errorCode: null,
  loading: false
};

export const addUserApi = createAsyncThunk<any, IUserParams>(USER.ACTION_TYPES.ADD_USER, async (user, thunkAPI) => {
  try {
    const response: IUserResponse = await api.addUserApi(user);

    return {
      ...response,
      successfully: true
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const appUsersSlice = createSlice({
  name: 'appLogin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addUserApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.successfully = action.payload.successfully;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.loading = false;
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
