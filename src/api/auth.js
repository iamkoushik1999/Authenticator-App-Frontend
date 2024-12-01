const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SEND_SIGNUP_OTP_URL = `${BASE_URL}/auth/send-otp?auth=signup`;
export const VERIFY_OTP_URL = `${BASE_URL}/auth/verify-otp`;
export const SEND_LOGIN_OTP_URL = `${BASE_URL}/auth/send-otp?auth=login`;
export const VERIFY_CODE_URL = `${BASE_URL}/auth/verify-code`;

export const GET_HISTORY_URL = `${BASE_URL}/history/get`;

export const PROFILE_URL = `${BASE_URL}/auth/me`;

export const CODE_GENERATE_URL = `${BASE_URL}/code/generate`;
export const CODE_VERIFY_URL = `${BASE_URL}/code/verify`;
