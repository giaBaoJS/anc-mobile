import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  CustomConfig,
  DefautConfig,
  HomeSettingField,
  // HOME_SETTING_LIST,
  ListOptionSorted,
  listPersonalMenu,
  OptionSortedField,
} from '../../models/HomeSetting';
import { requestGet, requestPost } from '../../services/ApiCall';
import i18n from '../../translations/i18n';
import { handleError } from '../../utils/HandleError';

export interface FilterField {
  type: string;
  page?: number;
  items_in_page?: number;
  search?: string;
}

export interface GetDataCommon {
  key: string;
  is_recursive: boolean;
  serverCode?: string;
}

export interface PostDataCommon {
  key: string;
  is_show?: boolean;
  prefs?: {};
}

export interface initialStateField {
  isLoading: boolean;
  settingListDefault: HomeSettingField[];
  settingList: HomeSettingField[];
  listOptionSorted: OptionSortedField[];
}

const initialState: initialStateField = {
  isLoading: false,
  settingListDefault: [],
  settingList: [],
  // defaultConfig: DefautConfig,
  // customConfig: CustomConfig,
  listOptionSorted: ListOptionSorted,
};

export const homeGetBanner = createAsyncThunk(
  'auth/get_banner',
  async (fields: FilterField, { rejectWithValue }) => {
    try {
      const response = await requestPost('news/vi/news/list_news/', {
        data: fields,
        needToken: false,
      });
      return response;
    } catch (error: any) {
      // handleError(error.response);
      return rejectWithValue(error);
    }
  },
);

export const homeGetDefaultUserConfigData = createAsyncThunk(
  'homeSetting/get_default_user_config_data',
  async (fields: GetDataCommon, { rejectWithValue }) => {
    try {
      const response = await requestPost(
        'common/vi/get_default_user_config_data/',
        {
          data: fields,
          needToken: false,
        },
      );
      return response;
    } catch (error: any) {
      // handleError(error.response);
      return rejectWithValue(error);
    }
  },
);

export const homeGetUserConfigData = createAsyncThunk(
  'homeSetting/get_user_config_data',
  async (fields: GetDataCommon, { rejectWithValue }) => {
    try {
      const response = await requestPost(
        `config-${fields.serverCode}/vi/get_user_config_data/`,
        {
          data: fields,
          needToken: true,
        },
      );
      return response;
    } catch (error: any) {
      // handleError(error.response);
      return rejectWithValue(error);
    }
  },
);

export const updateConfigData = createAsyncThunk(
  'homeSetting/update_config_data',
  async (fields: PostDataCommon, { rejectWithValue }) => {
    try {
      const response = await requestPost('user/vi/update_config_data/', {
        data: fields,
        needToken: true,
      });
      return response;
    } catch (error: any) {
      handleError(error.response);
      return rejectWithValue(error);
    }
  },
);

const HomeSettingSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeSettingList: (state, action) => {
      state.settingList = action.payload;
    },
    onPageShow: (state, action) => {
      console.log(action);
    },
  },
  extraReducers: builder => {
    //Auth Register Validator
    builder.addCase(homeGetBanner.fulfilled, (state, action) => {});

    // Get default User Config Data
    builder.addCase(homeGetDefaultUserConfigData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(homeGetDefaultUserConfigData.fulfilled, (state, action) => {
      let data = action.payload.data.d[0].children;
      // sort array by postion
      data = data.sort(
        (a: any, b: any) => a.prefs.sibling_order > b.prefs.sibling_order,
      );
      let settingList: any = [];
      data.forEach((element: any) => {
        settingList.push({
          name: element.name,
          key: element.key,
          is_show: element.is_show,
          slug: element.slug,
          prefs: {
            limit: element.prefs.limit,
            sibling_order: element.prefs.sibling_order,
            action: element.prefs.action,
            option_order_by_id: element.prefs.options_order_by_id,
          },
        });
      });
      const checkDuplicate = _.isEqual(
        settingList.sort(),
        state.settingListDefault.sort(),
      ); //true
      if (!checkDuplicate) {
        state.settingListDefault = settingList;
      }
    });
    builder.addCase(homeGetDefaultUserConfigData.rejected, state => {
      state.isLoading = false;
    });
    // Get User Config Data
    builder.addCase(homeGetUserConfigData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(homeGetUserConfigData.fulfilled, (state, action) => {
      let data = action.payload.data.d[0].children;
      // sort array by postion
      data = data.sort(
        (a: any, b: any) => a.prefs.sibling_order > b.prefs.sibling_order,
      );
      let settingList: any = [];
      data.forEach((element: any) => {
        settingList.push({
          name: element.name,
          key: element.key,
          is_show: element.is_show,
          slug: element.slug,
          prefs: {
            limit: element.prefs.limit,
            sibling_order: element.prefs.sibling_order,
            action: element.prefs.action,
          },
        });
      });
      const checkDuplicate = _.isEqual(
        settingList.sort(),
        state.settingList.sort(),
      ); //true
      if (!checkDuplicate) {
        state.settingList = settingList;
      }
    });
    builder.addCase(homeGetUserConfigData.rejected, state => {
      state.isLoading = false;
    });
    // Update config data
    builder.addCase(updateConfigData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateConfigData.fulfilled, (state, action) => {
      let data = action.payload.data.d[0];
      let idx = state.settingList.findIndex(x => x.key === data.key);

      state.settingList[idx].is_show = data.is_show;
      state.settingList[idx].prefs = data.prefs;
    });
    builder.addCase(updateConfigData.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const { changeSettingList, onPageShow } = HomeSettingSlice.actions;

export default HomeSettingSlice.reducer;
