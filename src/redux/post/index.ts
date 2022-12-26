import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@apis/index';
import {
  IPostParams,
  IPostCreateResponse,
  IPost,
  IPostParamsGetAll,
  IDataAllPost
} from '@src/models/IPosts';
import { POST, USERNAME_COOKIE } from '@src/constants';
import Cookies from 'js-cookie';

interface IFPostState {
  message: string
  dataPost?: IPost
  dataCreatorPosts?: IPost[]
  dataAllPost?: IDataAllPost
  errorCode?: string
}

const initialState: IFPostState = {
  message: '',
  dataPost: undefined,
  errorCode: undefined
};

export const getAllPostApi = createAsyncThunk<any, IPostParamsGetAll>(POST.ACTION_TYPES.GET_ALL_POST, async (params, thunkAPI) => {
  try {
    const response: IPostCreateResponse = await api.getAllPostApi(params);
    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const getPostByCreatorApi = createAsyncThunk<any,  { username: string }>(POST.ACTION_TYPES.GET_BY_CREATOR_POST, async (params, thunkAPI) => {
  try {
    const response: IPostCreateResponse = await api.getPostByCreatorApi(params);

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

export const deletePostApi = createAsyncThunk<any, { postId: string }>(POST.ACTION_TYPES.DELETE_POST, async (params, thunkAPI) => {
  try {
    const response: IPostCreateResponse = await api.deletePostApi(params);

    if (response.status === 200) {
      const username = Cookies.get(USERNAME_COOKIE);
      if (username) {
        await thunkAPI.dispatch(getPostByCreatorApi({ username }));
      }
    }

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
      .addCase(getAllPostApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;

        if (action.payload.status === 200) {
          const data = action.payload.data;
          const shortUrlOfPostLatest: string[] = [];
          data.postLatestOfType?.forEach((itemLatest: IPost) => {
            shortUrlOfPostLatest.push(itemLatest.shortUrl);
          });
          data.items = data.items?.filter((item: IPost) => shortUrlOfPostLatest.indexOf(item.shortUrl) === -1);
          state.dataAllPost = data;
        } else {
          state.errorCode = action.payload.errorCode;
        }
      })
      .addCase(getAllPostApi.pending, (state) => {
        state.errorCode = undefined;
      })
      .addCase(getAllPostApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
      })
      .addCase(createPostApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;

        if (action.payload?.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
        }
      })
      .addCase(createPostApi.pending, (state) => {
        state.errorCode = undefined;
      })
      .addCase(createPostApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
      })
      .addCase(getPostByCreatorApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;

        if (action.payload.status === 200) {
          state.dataCreatorPosts = action.payload.post;
        } else {
          state.errorCode = action.payload.errorCode;
        }
      })
      .addCase(getPostByCreatorApi.pending, (state) => {
        state.errorCode = undefined;
      })
      .addCase(getPostByCreatorApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
      })
      .addCase(editPostApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;

        if (action.payload.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
        }
      })
      .addCase(editPostApi.pending, (state) => {
        state.errorCode = undefined;
      })
      .addCase(editPostApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
      })
      .addCase(getPostByShortUrlApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;

        if (action.payload.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
        } else {
          state.dataPost = action.payload.post;
        }
      })
      .addCase(getPostByShortUrlApi.pending, (state) => {
        state.errorCode = undefined;
      })
      .addCase(getPostByShortUrlApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
      })
      .addCase(deletePostApi.fulfilled, (state, action:PayloadAction<any>) => {
        state.message = action.payload.message;

        if (action.payload.errorCode && action.payload.status !== 200) {
          state.errorCode = action.payload.errorCode;
        }
      })
      .addCase(deletePostApi.pending, (state) => {
        state.errorCode = undefined;
      })
      .addCase(deletePostApi.rejected, (state, action:PayloadAction<any>) => {
        state.errorCode = action.payload.errorCode;
      });
  }
});

export default appPostSlice.actions;
