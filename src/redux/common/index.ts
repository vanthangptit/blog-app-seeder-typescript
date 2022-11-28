import Cookies from 'js-cookie';

import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, USERNAME_COOKIE } from '@src/constants';

interface IFAccessTokenState {
  accessToken?: string
  username?: string
}

const initialState: IFAccessTokenState = {
  accessToken: undefined,
  username: undefined
};

export const appCommonSlice = createSlice({
  name: 'appCommon',
  initialState,
  reducers: {
    setToken(state, action) {
      Cookies.set(ACCESS_TOKEN, action.payload.accessToken, { expires: 7 });
      Cookies.set(USERNAME_COOKIE, action.payload.username, { expires: 7 });
    },
    getToken(state) {
      state.accessToken = Cookies.get(ACCESS_TOKEN);
      state.username = Cookies.get(USERNAME_COOKIE);
    },
    removeToken(state) {
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(USERNAME_COOKIE);

      state.accessToken = undefined;
      state.username = undefined;
    }
  }
});

export const { setToken, getToken, removeToken } = appCommonSlice.actions;
export default appCommonSlice.actions;
