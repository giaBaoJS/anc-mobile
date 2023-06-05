import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusLoginMethod } from '../../models/LoginMethod';
import { requestPost } from '../../services/ApiCall';
import { handleError } from '../../utils/HandleError';
import { onLogout } from './AuthSlice';

interface initialStateField {
  isLoading: boolean;
  statusLogin: StatusLoginMethod;
}
interface enabeAppleField {
  apple_token: string | undefined;
  device: string;
}

const initialState: initialStateField = {
  isLoading: false,
  statusLogin: {
    status_apple_login: false,
    status_google_login: false,
  },
};

export const checkMethodLogin = createAsyncThunk(
  'loginmethod/check_method_login',
  async (_, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/en/check_status_method_login/', {
        needToken: true,
      });
      return response.data;
    } catch (error: any) {
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);
export const enableLoginGoogle = createAsyncThunk(
  'loginmethod/enable_login_google',
  async (google_token: string, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/en/enable_google_login/', {
        needToken: true,
        data: { google_token: google_token },
      });
      return response.data;
    } catch (error: any) {
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);
export const disableLoginGoogle = createAsyncThunk(
  'loginmethod/disable_login_google',
  async (_, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/en/disable_google_login/', {
        needToken: true,
      });
      return response.data;
    } catch (error: any) {
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);
export const enableLoginApple = createAsyncThunk(
  'loginmethod/enable_login_apple',
  async (fields: enabeAppleField, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/en/enable_apple_login/', {
        needToken: true,
        data: fields,
      });
      return response.data;
    } catch (error: any) {
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);
export const disableLoginApple = createAsyncThunk(
  'loginmethod/disable_login_apple',
  async (_, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/en/disable_apple_login/', {
        needToken: true,
      });
      return response.data;
    } catch (error: any) {
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);
const LoginMethodSlice = createSlice({
  name: 'loginmethod',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Check Method Login
    builder.addCase(checkMethodLogin.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(checkMethodLogin.fulfilled, (state, action) => {
      state.statusLogin = action.payload.d[0];
      state.isLoading = false;
    });
    builder.addCase(checkMethodLogin.rejected, state => {
      state.isLoading = false;
    });
    // Enable Login Google
    builder.addCase(enableLoginGoogle.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(enableLoginGoogle.fulfilled, (state, action) => {
      state.statusLogin.status_google_login = true;
      state.isLoading = false;
    });
    builder.addCase(enableLoginGoogle.rejected, state => {
      state.isLoading = false;
    });
    // Disable Login Google
    builder.addCase(disableLoginGoogle.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(disableLoginGoogle.fulfilled, (state, action) => {
      state.statusLogin.status_google_login = false;
      state.isLoading = false;
    });
    builder.addCase(disableLoginGoogle.rejected, state => {
      state.isLoading = false;
    });
    // Enable Login Apple
    builder.addCase(enableLoginApple.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(enableLoginApple.fulfilled, (state, action) => {
      state.statusLogin.status_apple_login = true;
      state.isLoading = false;
    });
    builder.addCase(enableLoginApple.rejected, state => {
      state.isLoading = false;
    });
    // Disable Login Apple
    builder.addCase(disableLoginApple.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(disableLoginApple.fulfilled, (state, action) => {
      state.statusLogin.status_apple_login = false;
      state.isLoading = false;
    });
    builder.addCase(disableLoginApple.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = LoginMethodSlice.actions;

export default LoginMethodSlice.reducer;
