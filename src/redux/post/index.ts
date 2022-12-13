import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@apis/index';
import { IPostParams, IPostCreateResponse, IPost } from '@src/models/IPosts';
import { POST } from '@src/constants';

interface IFLoginState {
  message: string
  dataPost?: IPost
  errorCode?: string
  loading: boolean
}

const initialState: IFLoginState = {
  message: '',
  dataPost: undefined,
  errorCode: undefined,
  loading: false
};

export const getAllPostApi = createAsyncThunk<any>(POST.ACTION_TYPES.GET_ALL_POST, async (_, thunkAPI) => {
  try {
    const response: IPostCreateResponse = await api.getAllPostApi();

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getPostByShortUrlApi = createAsyncThunk<any, { shortUrl: string }>(POST.ACTION_TYPES.GET_BY_URL_POST, async (params, thunkAPI) => {
  try {
    const response: IPostCreateResponse = await api.getPostByShortUrlApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const createPostApi = createAsyncThunk<any, IPostParams>(POST.ACTION_TYPES.CREATE_POST, async (params, thunkAPI) => {
  try {
    const response: IPostCreateResponse = await api.createPostApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const editPostApi = createAsyncThunk<any, IPostParams>(POST.ACTION_TYPES.EDIT_POST, async (params, thunkAPI) => {
  try {
    const response: IPostCreateResponse = await api.editPostApi(params);

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const appPostSlice = createSlice({
  name: 'appPost',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createPostApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;
        state.loading = false;

        if (action.payload?.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
        }
      })
      .addCase(createPostApi.pending, (state) => {
        state.loading = true;
        state.errorCode = undefined;
      })
      .addCase(createPostApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
        state.loading = false;
      })
      .addCase(editPostApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;
        state.loading = false;

        if (action.payload.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
        }
      })
      .addCase(editPostApi.pending, (state) => {
        state.loading = true;
        state.errorCode = undefined;
      })
      .addCase(editPostApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
        state.loading = false;
      })
      .addCase(getPostByShortUrlApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;
        state.loading = false;

        if (action.payload.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
        } else {
          state.dataPost = action.payload.post;
        }
      })
      .addCase(getPostByShortUrlApi.pending, (state) => {
        state.loading = true;
        state.errorCode = undefined;
      })
      .addCase(getPostByShortUrlApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
        state.loading = false;
      });
  }
});

export default appPostSlice.actions;
