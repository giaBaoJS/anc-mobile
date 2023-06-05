import { createSlice } from '@reduxjs/toolkit';
import {
  FEATURES,
  UserHome,
  UserListFeatureField,
  USER_HOME_LIST,
} from '../../models/UserHome';

interface initialStateField {
  isLoading: boolean;
  isError: boolean;
  isShowMoney: boolean;
  userHomeList: UserHome[];
  features: UserListFeatureField;
}

const initialState: initialStateField = {
  isLoading: false,
  isError: false,
  userHomeList: USER_HOME_LIST,
  features: FEATURES,
  isShowMoney: false,
};

const UserHomeSlice = createSlice({
  name: 'userhome',
  initialState,
  reducers: {
    onShowMonney: state => {
      state.isShowMoney = !state.isShowMoney;
    },
  },
});

export const { onShowMonney } = UserHomeSlice.actions;

export default UserHomeSlice.reducer;
