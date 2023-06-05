import Validator from '../utils/Validator';

export interface AuthInitialState {
  isLoading: boolean;
  isLogin: boolean;
  userInfo: UserInfoField | null;
  accessToken: any;
  userBioConfig: boolean;
  qrCode: string;
  userRefer: any;
  listReferred: any;
}

export interface AuthLoginField {
  username: string;
  password: string;
}
export interface AuthChangePass {
  password: string;
  new_password: string;
  re_new_password: string;
}

export interface ForgotPassRequestField {
  type: string;
  email?: string;
  phone?: string;
  phone_country?: string;
}
export interface ForgotPassOTPField {
  type: string;
  code?: string;
  token: string;
  otp?: string;
  firebase_token?: string;
  phone?: string;
  phone_country?: string;
}
export interface ForgotPassUpdateField {
  code: string;
  token: string;
  password: string;
  re_password: string;
}
export interface AuthRegisterValidationField {
  name: string;
  surname: string;
  username: string;
  password: string;
  re_password: string;
  phone: string;
  phone_country: string;
  google_token: string;
  apple_token: string;
  device: string;
  present_code: string;
  email: string;
}

export interface AuthRegisterField extends AuthRegisterValidationField {
  firebase_token: any;
}

export interface UserInfoField {
  uid: string;
  name: string;
  surname: string;
  display_name: string;
  avatar: string;
  is_active: boolean;
  username: string;
  present_code: string;
  registration_date: string;
  birthday: {
    birthday: string;
    show_privacy: string;
  };
  gender: {
    gender: string;
    gender_display: string;
    show_privacy: string;
  };
  email: {} | any;
  phone: {
    phone: string;
    phone_country: string;
    phone_full: string;
    is_active: boolean;
    is_verify: boolean;
    is_main: boolean;
    show_privacy: string;
  };

  presenter: {} | any;
  google_account: {} | any;
  apple_account: {} | any;
  extra: { config: string } | any;
}

export interface AuthSocialField {
  email?: string;
  name?: string;
  surname?: string;
}

export interface AuthGoogleField extends AuthSocialField {
  google_token: string;
}

export interface AuthAppleField extends AuthSocialField {
  apple_token: string;
  device: string;
}

export const GOOGLE_API_APP_MAPPING = [
  { api: 'email', app: 'email', defaultValue: '' },
  { api: 'given_name', app: 'name', defaultValue: '' },
  { api: 'family_name', app: 'surname', defaultValue: '' },
];

export const APPLE_API_APP_MAPPING = [
  { api: 'email', app: 'email', defaultValue: '' },
  { api: 'given_name', app: 'name', defaultValue: '' },
  { api: 'family_name', app: 'surname', defaultValue: '' },
];

export const validateLogin = (
  key: keyof AuthLoginField,
  value: string,
): string | null => {
  const val = new Validator(value);
  val.safeCharacter();
  switch (key) {
    case 'username':
      val.required().min(3).max(24);
      break;
    case 'password':
      val.required().min(3).max(24);
      break;
    default:
      break;
  }

  return val.getError();
};

export const validateAll = (authLoginInfo: AuthLoginField): Object =>
  Object.keys(authLoginInfo)
    .map(key => ({
      key,
      error: validateLogin(
        key as keyof AuthLoginField,
        authLoginInfo[key as keyof AuthLoginField],
      ),
    }))
    .filter(({ error }) => !!error)
    .reduce((acc, cur) => ({ ...acc, [cur.key]: cur.error }), {});
