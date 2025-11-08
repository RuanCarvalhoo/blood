export const API_CONFIG = {
  WEB_BASE_URL: "http://localhost:4000/api",
  ANDROID_EMULATOR_BASE_URL: "http://10.0.2.2:4000/api",
  LOCAL_NETWORK_BASE_URL: "http://192.168.1.100:4000/api",
};

export const getApiBaseUrl = (): string => {
  if (process.env.REACT_NATIVE_API_URL) {
    return process.env.REACT_NATIVE_API_URL;
  }

  return API_CONFIG.WEB_BASE_URL;
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
    
  REGISTER: "/users/register",
  LOGIN: "/users/login",

  USER_PROFILE: (id: string) => `/users/${id}`,

  DONATIONS: "/donations",
  USER_DONATIONS: (userId: string) => `/donations/user/${userId}`,

  BADGES: "/badges",
  USER_BADGES: (userId: string) => `/badges/user/${userId}`,
} as const;
