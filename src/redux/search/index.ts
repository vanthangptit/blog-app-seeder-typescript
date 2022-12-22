import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@apis/index';
import { IPost } from '@src/models/IPosts';
import { SEARCH } from '@src/constants';
import { ISearchPostParams } from '@models/ISearch';

interface IFSearchState {
  message: string
  data?: {
    items: IPost[]
  }
  errorCode?: string
}

const initialState: IFSearchState = {
  message: '',
  data: undefined,
  errorCode: undefined
};

export const searchPostApi = createAsyncThunk<any, ISearchPostParams>(SEARCH.ACTION_TYPES.SEARCH_POST, async (params, thunkAPI) => {
  try {
    const response: any = await api.searchPostApi(params);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const appSearchSlice = createSlice({
  name: 'appSearch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchPostApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;

        if (action.payload.status === 200) {
          state.data = action.payload.data;
        } else {
          state.errorCode = action.payload.errorCode;
        }
      })
      .addCase(searchPostApi.pending, (state) => {
        state.errorCode = undefined;
      })
      .addCase(searchPostApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
      });
  }
});

export default appSearchSlice.actions;
