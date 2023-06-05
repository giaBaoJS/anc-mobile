import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestGet, requestPost } from '../../services/ApiCall';
import {
  SecurityActive2FaField,
  SecurityCode2FaField,
  SecurityGet2FaTokenField,
  SecurityOtpField,
  SecurityFirebaseField,
  SecurityQrField,
  SecurityVerifyLoginTokenField,
  SecurityRemoveGoogleField,
} from '../../models/Security';
import { handleError } from '../../utils/HandleError';
import { onLogout } from './AuthSlice';

interface initialStateField {
  isLoading: boolean;
  active2Fa: SecurityActive2FaField;
  code2Fa: SecurityCode2FaField;
  qrData: SecurityQrField;
}

const initialState: initialStateField = {
  isLoading: false,
  active2Fa: {
    authenticate_by_google: false,
    authenticate_by_sms: false,
  },
  code2Fa: {
    code_2fa: '',
    token_2fa: '',
  },
  qrData: {
    google_authenticatior_code: '',
    url_qrcode: '',
  },
};

export const securityGetActive2Fa = createAsyncThunk(
  'security/get_active_2fa',
  async (_void, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/vi/check_active_authenticate/', {
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

export const securityGet2FaToken = createAsyncThunk(
  'security/get_2fa_token',
  async (fields: SecurityGet2FaTokenField, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/vi/get_2fa_token/', {
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

export const securityVerifyGoogleAuth = createAsyncThunk(
  'security/verify_2fa_google_auth',
  async (fields: SecurityOtpField, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost(
        'user/vi/verify_authenticate_by_google/',
        {
          needToken: true,
          data: fields,
        },
      );
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

export const securityCreateQr = createAsyncThunk(
  'security/create_2fa_qr',
  async (fields: SecurityCode2FaField, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost(
        'user/vi/create_qrcode_url_2fa_by_google/',
        {
          needToken: true,
          data: fields,
        },
      );
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

export const securityDetele2FaGoogleAuth = createAsyncThunk(
  'security/delete_2fa_google_auth',
  async (fields: SecurityRemoveGoogleField, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost(
        'user/vi/delete_authenticate_by_google/',
        {
          needToken: true,
          data: fields,
        },
      );
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

export const securityCreateSms2Fa = createAsyncThunk(
  'security/security_create_2fa_sms',
  async (fields: SecurityFirebaseField, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost(
        'user/vi/create_authenticate_by_sms/',
        {
          needToken: true,
          data: fields,
        },
      );
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

export const securityDeleteSms2Fa = createAsyncThunk(
  'security/security_delete_2fa_sms',
  async (fields: SecurityFirebaseField, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost(
        'user/vi/delete_authenticate_by_sms/',
        {
          needToken: true,
          data: fields,
        },
      );
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

const SecuritySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Get active 2FA
    builder.addCase(securityGetActive2Fa.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(securityGetActive2Fa.fulfilled, (state, action) => {
      state.active2Fa = action.payload.d[0];
      state.isLoading = false;
    });
    builder.addCase(securityGetActive2Fa.rejected, state => {
      state.isLoading = false;
    });
    // Get 2FA token
    builder.addCase(securityGet2FaToken.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(securityGet2FaToken.fulfilled, (state, action) => {
      state.code2Fa = action.payload.d[0];
      state.isLoading = false;
    });
    builder.addCase(securityGet2FaToken.rejected, state => {
      state.isLoading = false;
    });
    // Create 2FA QR code
    builder.addCase(securityCreateQr.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(securityCreateQr.fulfilled, (state, action) => {
      state.qrData = action.payload.d[0];
      state.isLoading = false;
    });
    builder.addCase(securityCreateQr.rejected, state => {
      state.isLoading = false;
    });
    // Create 2FA Google Auth
    builder.addCase(securityVerifyGoogleAuth.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(securityVerifyGoogleAuth.fulfilled, (state, action) => {
      state.active2Fa.authenticate_by_google = true;
      state.isLoading = false;
    });
    builder.addCase(securityVerifyGoogleAuth.rejected, state => {
      state.isLoading = false;
    });
    // Delete 2FA Google Auth
    builder.addCase(securityDetele2FaGoogleAuth.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(securityDetele2FaGoogleAuth.fulfilled, (state, action) => {
      state.active2Fa.authenticate_by_google = false;
      state.isLoading = false;
    });
    builder.addCase(securityDetele2FaGoogleAuth.rejected, state => {
      state.isLoading = false;
    });
    // Create 2FA SMS
    builder.addCase(securityCreateSms2Fa.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(securityCreateSms2Fa.fulfilled, (state, action) => {
      state.active2Fa.authenticate_by_sms = true;
      state.isLoading = false;
    });
    builder.addCase(securityCreateSms2Fa.rejected, state => {
      state.isLoading = false;
    });
    // Delete 2FA SMS
    builder.addCase(securityDeleteSms2Fa.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(securityDeleteSms2Fa.fulfilled, (state, action) => {
      state.active2Fa.authenticate_by_sms = false;
      state.isLoading = false;
    });
    builder.addCase(securityDeleteSms2Fa.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = SecuritySlice.actions;

export default SecuritySlice.reducer;
