import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  AuthChangePass,
  AuthInitialState,
  AuthLoginField,
  AuthRegisterField,
  AuthRegisterValidationField,
  ForgotPassOTPField,
  ForgotPassRequestField,
  ForgotPassUpdateField,
  UserInfoField,
} from '../../models/Auth';
import { handleError } from '../../utils/HandleError';
import { requestPost } from '../../services/ApiCall';
import { removeFromStorage, saveToStorage } from '../../utils/Common';
import * as Keychain from 'react-native-keychain';
import { SecurityVerifyLoginTokenField } from '../../models/Security';

const initialState: AuthInitialState = {
  isLoading: false,
  isLogin: false,
  userBioConfig: false,
  userInfo: null,
  accessToken: null,
  qrCode: '',
  userRefer: null,
  listReferred: [],
};

export const authRegistValidator = createAsyncThunk(
  'auth/register_validator',
  async (
    fields: AuthRegisterValidationField,
    { rejectWithValue, dispatch },
  ) => {
    const forceLogout = async (): Promise<void> => {
      await dispatch(authLogout()).unwrap();
    };
    try {
      const response = await requestPost('user/vi/check_valid_register/', {
        data: fields,
        needToken: false,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      handleError(error.response, forceLogout);
      return rejectWithValue(error);
    }
  },
);

export const authRegister = createAsyncThunk(
  'auth/register',
  async (fields: AuthRegisterField, { rejectWithValue }) => {
    try {
      const response = await requestPost('user/vi/register/', {
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

export const authGetUserInfo = createAsyncThunk(
  'auth/user_info',
  async (_: void, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/vi/get_user_info/', {
        needToken: true,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);

export const authLogin = createAsyncThunk(
  'auth/login',
  async (fields: AuthLoginField, { rejectWithValue }) => {
    try {
      const response = await requestPost('user/vi/login/', {
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

export const authSocialGoogle = createAsyncThunk(
  'auth/google_login',
  async ({ google_token }: any, { rejectWithValue }) => {
    try {
      const response = await requestPost('user/vi/login_with_google/', {
        data: { google_token },
        needToken: false,
      });
      return response.data;
    } catch (error: any) {
      handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);

export const authSocialApple = createAsyncThunk(
  'auth/social_login',
  async ({ apple_token, device }: any, { rejectWithValue }) => {
    try {
      const response = await requestPost('user/vi/login_with_apple/', {
        data: { apple_token, device },
        needToken: false,
      });
      return response.data;
    } catch (error: any) {
      handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);

export const authForgotPassRequest = createAsyncThunk(
  'auth/forgot_pass_request',
  async (fields: ForgotPassRequestField, { rejectWithValue }) => {
    try {
      const response = await requestPost('user/vi/forgot_password_request/', {
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
export const authForgotPassOTP = createAsyncThunk(
  'auth/forgot_pass_otp',
  async (fields: ForgotPassOTPField, { rejectWithValue }) => {
    try {
      const response = await requestPost(
        'user/vi/forgot_password_verify_otp/',
        {
          data: fields,
          needToken: false,
        },
      );
      return response.data;
    } catch (error: any) {
      handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);
export const authForgotPassUpdateNew = createAsyncThunk(
  'auth/forgot_pass_update_new',
  async (fields: ForgotPassUpdateField, { rejectWithValue }) => {
    try {
      const response = await requestPost(
        'user/vi/forgot_password_update_new/',
        {
          data: fields,
          needToken: false,
        },
      );
      return response.data;
    } catch (error: any) {
      handleError(error.response !== undefined ? error.response : error);
      return rejectWithValue(error);
    }
  },
);

export const authChangePass = createAsyncThunk(
  'auth/change_pass',
  async (fields: AuthChangePass, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/en/update_password/', {
        data: fields,
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
export const authLogout = createAsyncThunk(
  'auth/log_out',
  async (_, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/vi/logout/', {
        needToken: true,
      });
      await Keychain.resetGenericPassword();
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
export const authGetQRcode = createAsyncThunk(
  'auth/get_qrcode',
  async (_, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/en/get_my_present_code/', {
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

export const authUpdateAvatar = createAsyncThunk(
  'auth/update_avatar',
  async (avatar: Object, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/en/update_avatar/', {
        data: avatar,
        needToken: true,
        formData: true,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);

export const authVerifyLoginToken = createAsyncThunk(
  'auth/verify_login_token',
  async (
    fields: SecurityVerifyLoginTokenField,
    { rejectWithValue, dispatch },
  ) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('user/vi/login_pass_2fa/', {
        needToken: true,
        data: fields,
      });
      console.log(response.data.d[0]);
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

export const authSaveDeviceToken = createAsyncThunk(
  'auth/saveDeviceToken',
  async (token: string, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('/user/vi/set_fcm_id/', {
        needToken: true,
        data: { fcm_id: token },
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
export const authGetReferMe = createAsyncThunk(
  'auth/get_refer_me',
  async (_, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('/user/en/user_refer_me/', {
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
export const authUserReferred = createAsyncThunk(
  'auth/get_user_referred',
  async (_, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('/user/en/user_have_referred/', {
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
export const UpdateName = createAsyncThunk(
  'auth/update_name',
  async (display_name: string, { rejectWithValue, dispatch }) => {
    const forceLogout = () => {
      dispatch(onLogout());
    };
    try {
      const response = await requestPost('/user/en/update_user_display_name/', {
        needToken: true,
        data: { display_name: display_name },
      });
      return display_name;
    } catch (error: any) {
      handleError(
        error.response !== undefined ? error.response : error,
        forceLogout,
      );
      return rejectWithValue(error);
    }
  },
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<AuthLoginField>) => {
      state.isLogin = true;
    },
    onLogout: state => {
      state.isLogin = false;
      state.userInfo = null;
      state.accessToken = null;
      removeFromStorage('authToken');
      removeFromStorage('BiometricConfig');
    },
    onEnableConfig: state => {
      state.userBioConfig = true;
    },
    onDisableConfig: state => {
      state.userBioConfig = false;
    },
  },
  extraReducers: builder => {
    //Auth Register Validator
    builder.addCase(authRegistValidator.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authRegistValidator.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authRegistValidator.rejected, state => {
      state.isLoading = false;
    });

    //Auth Register
    builder.addCase(authRegister.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authRegister.fulfilled, (state, action) => {
      const { token } = action.payload.d[0];
      saveToStorage('authToken', JSON.stringify(token));
      state.accessToken = action.payload.d[0];
      state.isLoading = false;
    });
    builder.addCase(authRegister.rejected, state => {
      state.isLoading = false;
    });

    //Auth Login
    builder.addCase(authLogin.fulfilled, (state, action) => {
      const { token } = action.payload.d[0];
      saveToStorage('authToken', JSON.stringify(token));
      state.accessToken = action.payload.d[0];
    });
    //Auth Logout
    builder.addCase(authLogout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authLogout.fulfilled, (state, action) => {
      state.isLogin = false;
      state.userInfo = null;
      state.accessToken = null;
      removeFromStorage('authToken');
      removeFromStorage('BiometricConfig');
      state.isLoading = false;
    });
    builder.addCase(authLogout.rejected, state => {
      state.isLoading = false;
    });
    //Auth Forgot Password Request
    builder.addCase(authForgotPassRequest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authForgotPassRequest.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authForgotPassRequest.rejected, state => {
      state.isLoading = false;
    });
    //Auth Forgot Password OTP
    builder.addCase(authForgotPassOTP.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authForgotPassOTP.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authForgotPassOTP.rejected, state => {
      state.isLoading = false;
    });
    //Auth Forgot Password Update New
    builder.addCase(authForgotPassUpdateNew.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authForgotPassUpdateNew.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authForgotPassUpdateNew.rejected, state => {
      state.isLoading = false;
    });
    //Auth Change New Pass
    builder.addCase(authChangePass.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authChangePass.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authChangePass.rejected, state => {
      state.isLoading = false;
    });
    //Auth Get User Info
    builder.addCase(authGetUserInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authGetUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.userInfo = action.payload.d[0];
    });
    builder.addCase(authGetUserInfo.rejected, state => {
      state.isLoading = false;
    });
    //Update Avatar
    builder.addCase(authUpdateAvatar.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authUpdateAvatar.fulfilled, (state, action) => {
      const avatar = action.payload.d[0].avatar;
      if (state.userInfo) {
        state.userInfo.avatar = avatar;
      }
      state.isLoading = false;
    });
    builder.addCase(authUpdateAvatar.rejected, state => {
      state.isLoading = false;
    });
    // Verify Login Token
    builder.addCase(authVerifyLoginToken.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authVerifyLoginToken.fulfilled, (state, action) => {
      state.isLogin = true;
      state.isLoading = false;
    });
    builder.addCase(authVerifyLoginToken.rejected, state => {
      state.isLoading = false;
    });
    // Auth Get QRcode
    builder.addCase(authGetQRcode.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authGetQRcode.fulfilled, (state, action) => {
      state.isLoading = false;
      const { present_code } = action.payload.d[0];
      state.qrCode = present_code;
    });
    builder.addCase(authGetQRcode.rejected, state => {
      state.isLoading = false;
    });
    // Auth Set FCM Token
    builder.addCase(authSaveDeviceToken.pending, state => {
      // state.isLoading = true;
    });
    builder.addCase(authSaveDeviceToken.fulfilled, (state, action) => {
      // state.isLoading = false;
    });
    builder.addCase(authSaveDeviceToken.rejected, state => {
      // state.isLoading = false;
    });
    // Auth Get User Refer Me
    builder.addCase(authGetReferMe.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authGetReferMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userRefer = action.payload.d[0];
    });
    builder.addCase(authGetReferMe.rejected, state => {
      state.isLoading = false;
    });
    // Auth Get User Referred
    builder.addCase(authUserReferred.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authUserReferred.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listReferred = action.payload.d;
    });
    builder.addCase(authUserReferred.rejected, state => {
      state.isLoading = false;
    });
    // Update Name
    builder.addCase(UpdateName.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(UpdateName.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.userInfo) {
        state.userInfo.display_name = action.payload;
      }
    });
    builder.addCase(UpdateName.rejected, state => {
      state.isLoading = false;
    });
    //Auth Google Login
    builder.addMatcher(
      isAnyOf(authSocialGoogle.fulfilled, authSocialApple.fulfilled),
      (state, action) => {
        const { token } = action.payload.d[0];
        console.log(token);
        state.accessToken = action.payload.d[0];
        saveToStorage('authToken', JSON.stringify(token));
        return state;
      },
    );
  },
});

export const { onLogin, onLogout, onEnableConfig, onDisableConfig } =
  AuthSlice.actions;

export default AuthSlice.reducer;
