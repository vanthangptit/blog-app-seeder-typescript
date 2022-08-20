// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Api Imports
import api from '@apis/index';

// ** Imports IF User
import {
  IGuestContactParams,
  IGuestContactResponse
} from '@src/models/IContact';

// ** Imports constants
import { GUEST_CONTACT } from '@src/constants';

interface IFGuestContactState {
  message: string | null
  status: number | null
  successfully: boolean
  errorCode: string | null
  loading: boolean
}

const initialState: IFGuestContactState = {
  message: null,
  status: null,
  successfully: false,
  errorCode: null,
  loading: false
};

export const guestContactApi = createAsyncThunk<any, IGuestContactParams>(GUEST_CONTACT.ACTION_TYPES.GUEST_CONTACT_API, async (params, thunkAPI) => {
  try {
    const response: IGuestContactResponse = await api.guestContactApi(params);

    return {
      ...response,
      successfully: true
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
});

export const appGuestContactSlice = createSlice({
  name: 'appGuestContact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(guestContactApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.successfully = action.payload.successfully;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.loading = false;
      })
      .addCase(guestContactApi.pending, (state, action:PayloadAction<any>) => {
        state.loading = true;
      })
      .addCase(guestContactApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
        state.loading = false;
      })
  }
});

export default appGuestContactSlice.actions;
