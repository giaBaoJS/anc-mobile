export interface SecurityActive2FaField {
  authenticate_by_google: boolean;
  authenticate_by_sms: boolean;
}

export interface SecurityCode2FaField {
  code_2fa: string;
  token_2fa: string;
}

export interface SecurityVerifyLoginTokenField extends SecurityCode2FaField {
  token: string;
}

export interface SecurityRemoveGoogleField extends SecurityCode2FaField {
  otp_code: string;
}

export interface SecurityOtpField {
  otp_code: string;
}

export interface SecurityFirebaseField {
  firebase_token: string;
}

export interface SecurityQrField {
  google_authenticatior_code: string;
  url_qrcode: string;
}

export interface SecurityGet2FaTokenField {
  is_only_sms?: number;
  firebase_token?: string;
  phone?: string;
  phone_country?: string;
  google_authent_otp?: string;
}
