import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  NewsDetailField,
  NewsInfoField,
  NewsLabelField,
} from '../../models/News';
import { requestGet, requestPost } from '../../services/ApiCall';
import { handleError } from '../../utils/HandleError';
import { onLogout } from './AuthSlice';

interface NewsParamField {
  page?: number;
  items_in_page?: number;
  search?: string;
  category_id?: number;
  member_only?: string;
  type: string;
}

interface initialStateField {
  isLoading: boolean;
  isError: boolean;
  newsListType: NewsLabelField[];
  allNews: any;
  detailRelatedNews: NewsDetailField | null;
}

const initialState: initialStateField = {
  isLoading: false,
  isError: false,
  newsListType: [],
  allNews: {},
  detailRelatedNews: null,
};

export const newsGetType = createAsyncThunk(
  'news/get_category_list',
  async (_void, { rejectWithValue }) => {
    try {
      const response = await requestGet('news/vi/news/list_category/', {
        needToken: false,
      });
      return response.data;
    } catch (error: any) {
      handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);

export const newsGetList = createAsyncThunk(
  'news/get_news_list',
  async (fields: NewsParamField, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('news/vi/news/list_news/', {
        data: fields,
        needToken: fields.member_only ? true : false,
      });
      console.log(response.data);
      return {
        data: response.data,
        type: fields.type,
      };
    } catch (error: any) {
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);

export const newsGetRelatedList = createAsyncThunk(
  'news/get_related_news_list',
  async (fields: { id: string }, { rejectWithValue }) => {
    try {
      const response = await requestPost('news/vi/news/news_detail/', {
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

const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    onReset: state => {
      return {
        ...state,
        isError: false,
        newsListType: [],
        allNews: null,
        relatedNews: null,
      };
    },
  },
  extraReducers: builder => {
    // Get news type
    builder.addCase(newsGetType.pending, state => {
      state.isError = false;
    });
    builder.addCase(newsGetType.fulfilled, (state, action) => {
      const { payload } = action;
      state.newsListType = payload.d;
    });
    builder.addCase(newsGetType.rejected, state => {
      state.isError = true;
    });
    // Get news list
    builder.addCase(newsGetList.pending, state => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(newsGetList.fulfilled, (state, action) => {
      const payload = action.payload.data.d[0];
      const page = payload.page;
      const type = action.payload.type;
      if (page === 1 || page === 0) {
        return {
          ...state,
          isLoading: false,
          allNews: {
            ...state.allNews,
            [type]: { data: payload.d, totalPage: payload.total_page, page },
          },
        };
      }
      state.allNews[type].page = page;
      state.allNews[type].totalPage = payload.total_page;
      state.allNews[type].data = [...state.allNews[type].data, ...payload.d];
      state.isLoading = false;
    });
    builder.addCase(newsGetList.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
    // Detail/Related News
    builder.addCase(newsGetRelatedList.pending, state => {
      state.isError = false;
    });
    builder.addCase(newsGetRelatedList.fulfilled, (state, action) => {
      const payload = action.payload.d[0];
      state.detailRelatedNews = payload;
    });
    builder.addCase(newsGetRelatedList.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const { onReset } = NewsSlice.actions;

export default NewsSlice.reducer;
