import { configureStore } from '@reduxjs/toolkit';
import {
  AuthSlice,
  BottomTabSlice,
  HomeSlice,
  HomeSettingSlice,
  HambugerSlice,
  NewsSlice,
  UserHomeSlice,
  ContactSlice,
  SecuritySlice,
  LoginMethodSlice,
} from './slices';

const createDebugger = require('redux-flipper').default;

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    bottomtab: BottomTabSlice,
    home: HomeSlice,
    homeSetting: HomeSettingSlice,
    hambuger: HambugerSlice,
    news: NewsSlice,
    userHome: UserHomeSlice,
    contact: ContactSlice,
    security: SecuritySlice,
    loginMethod: LoginMethodSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(createDebugger()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
