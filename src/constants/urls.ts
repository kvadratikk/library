export const DEFAULT_URL = 'https://library-cleverland-2jfze.ondigitalocean.app';

const BASE = `${DEFAULT_URL}/api`;
const USER = `${BASE}/auth`;
const USERS = `${BASE}/users`;
const AUTH = `${USER}/local`;

export const Urls = {
  BASE,
  USER,
  CATEGORIES: `${BASE}/categories`,
  BOOKS: `${BASE}/books`,
  AUTH,
  BOOKING: `${BASE}/bookings`,
  COMMENTS: `${BASE}/comments`,
  USERS,
  UPLOAD: `${BASE}/upload`,
  ME: `${USERS}/me`,
  REGISTER: `${AUTH}/register`,
  FORGOT: `${USER}/forgot-password`,
  RESET: `${USER}/reset-password`,
};
