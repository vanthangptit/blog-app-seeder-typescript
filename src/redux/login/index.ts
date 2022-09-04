// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Api Imports
import api from '@apis/index';

// ** Imports IF User
import {
  ILoginParams,
  ILoginResponse,
  IDataLogin
} from '@src/models/ILogin';

// ** Imports constants
import { LOGIN } from '@src/constants';

interface IFLoginState {
  message: string
  status: number | null
  data: IDataLogin | null
  successfully: boolean
  errorCode?: string | null
  loading: boolean
}

const initialState: IFLoginState = {
  message: '',
  status: null,
  data: null,
  successfully: false,
  errorCode: null,
  loading: false
};

export const loginApi = createAsyncThunk<any, ILoginParams>(LOGIN.ACTION_TYPES.LOGIN_API, async (params, thunkAPI) => {
  try {
    const response: ILoginResponse = await api.loginApi(params);

    return {
      ...response,
      successfully: !(response.errorCode && response.status !== 200)
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const appLoginSlice = createSlice({
  name: 'appLogin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.loading = false;

        if (action.payload.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
          state.successfully = false;
        } else {
          state.data = action.payload.data;
          state.successfully = true;
        }
      })
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
        state.loading = false;
      });
  }
});

export default appLoginSlice.actions;
