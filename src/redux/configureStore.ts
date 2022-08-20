import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// ** Reducers Imports
import { appGuestContactSlice } from './contact';
import { appLoginSlice } from './login';
import { appUsersSlice } from './register';

export const store = configureStore({
  reducer: {
    guestContact: appGuestContactSlice.reducer,
    login: appLoginSlice.reducer,
    register: appUsersSlice.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
