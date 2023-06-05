import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  BottomTabInitialState,
  TabItemField,
} from '../../models/Bottomtab';
import { HomeTab, UserTab } from '../../navigators/tab/OptionsTab';

const initialState = {
  homeTabItemList: HomeTab,
  userTabItemList: UserTab,
} as BottomTabInitialState;

const BottomTabSlice = createSlice({
  name: 'bottomTab',
  initialState,
  reducers: {
    changeHomeTab: (state, action: PayloadAction<TabItemField[]>) => {
      state.homeTabItemList = action.payload;
    },
    changeUserTab: (state, action: PayloadAction<TabItemField[]>) => {
      state.userTabItemList = action.payload;
    },
  },
});

export const { changeHomeTab, changeUserTab } = BottomTabSlice.actions;

export default BottomTabSlice.reducer;
