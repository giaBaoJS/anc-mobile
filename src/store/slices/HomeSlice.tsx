import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Banner, BannerItemField } from '../../models/Banner';
import {
  DefaultNewsWidget,
  DefaultProjectWidget,
  DefaultResourceWidget,
  NewsWidgetField,
  ProjectWidgetField,
  ResourceWidgetField,
  UtilityField,
} from '../../models/Widget';
import type { NewsInfoField } from '../../models/News';
import { requestGet, requestPost } from '../../services/ApiCall';
import { handleError } from '../../utils/HandleError';
import { HOME_DASHBOARD_ANC_UTILITIES_WIDGET } from '../../utils/Constants';
import Colors from '../../theme/Colors';

export interface NewsField {
  category_id?: number;
  page?: number;
  items_in_page?: number;
  search?: string;
}

export interface GetDataCommon {
  key: string;
  is_recursive: boolean;
  serverCode?: string;
}

export interface initialStateField {
  isLoading: boolean;
  isError: boolean;
  banners: BannerItemField[];
  utilityWidget: UtilityField[];
  projectWidget: ProjectWidgetField;
  newsWidget: NewsWidgetField;
  resourceWidget: ResourceWidgetField;
  aboutWidget: null | NewsInfoField;
  totalPage: null | number;
}

const initialState: initialStateField = {
  isLoading: false,
  isError: false,
  banners: Banner,
  utilityWidget: [],
  projectWidget: DefaultProjectWidget,
  newsWidget: DefaultNewsWidget,
  resourceWidget: DefaultResourceWidget,
  aboutWidget: null as null | NewsInfoField,
  totalPage: null,
};

export const homeGetBanner = createAsyncThunk(
  'home/get_news',
  async (fields: NewsField, { rejectWithValue }) => {
    try {
      const response = await requestPost('news/vi/news/list_news/', {
        data: fields,
        needToken: false,
      });
      return response.data;
    } catch (error: any) {
      handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);

export const homeGetNews = createAsyncThunk(
  'home/get_news',
  async (fields: NewsField, { rejectWithValue }) => {
    try {
      const response = await requestPost('news/vi/news/list_news/', {
        data: fields,
        needToken: false,
      });
      return response.data;
    } catch (error: any) {
      // handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);

export const HomeGetAbout = createAsyncThunk(
  'home/get_about',
  async (_void, { rejectWithValue }) => {
    try {
      const response = await requestGet('news/vi/news/about_detail/', {
        needToken: false,
      });
      return response.data;
    } catch (error: any) {
      // handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);

export const homeGetUtilityWidget = createAsyncThunk(
  'home/get_utility_widget',
  async (fields: GetDataCommon, { rejectWithValue }) => {
    try {
      const response = await requestPost(
        'common/vi/get_default_user_config_data/',
        {
          data: fields,
          needToken: false,
        },
      );
      return response.data;
    } catch (error: any) {
      // handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeUtilityWidget: (state, action) => {
      state.utilityWidget = action.payload;
    },
  },
  extraReducers: builder => {
    // Get News
    builder.addCase(homeGetNews.pending, state => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(homeGetNews.fulfilled, (state, action) => {
      const payload = action.payload.d[0];
      state.newsWidget.news = payload.d;
      state.totalPage = payload.total_page;
      state.isLoading = false;
    });
    builder.addCase(homeGetNews.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
    // Get About
    builder.addCase(HomeGetAbout.pending, state => {
      state.isError = false;
    });
    builder.addCase(HomeGetAbout.fulfilled, (state, action) => {
      const payload = action.payload.d[0];
      state.aboutWidget = payload;
    });
    builder.addCase(HomeGetAbout.rejected, state => {
      state.isLoading = false;
    });
    // Get Utility Widget
    builder.addCase(homeGetUtilityWidget.pending, state => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(homeGetUtilityWidget.fulfilled, (state, action) => {
      let data = action.payload.d[0].children;
      let items = data.filter(
        (x: any) => x.key === HOME_DASHBOARD_ANC_UTILITIES_WIDGET,
      )[0].children;

      if (items.length > 0) {
        state.utilityWidget = [];
      }

      items.forEach((element: any) => {
        state.utilityWidget.push({
          name: element.name,
          slug: element.slug,
          color: Colors.primary,
          authRequire: false,
        });
      });
    });
    builder.addCase(homeGetUtilityWidget.rejected, state => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { changeUtilityWidget } = HomeSlice.actions;

export default HomeSlice.reducer;
