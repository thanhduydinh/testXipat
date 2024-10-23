import Cookies from "js-cookie";

const tokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

export function getToken() {
  return Cookies.get(tokenKey);
}

export function setToken(token: string) {
  return Cookies.set(tokenKey, token);
}

export function removeToken() {
  return Cookies.remove(tokenKey);
}

export function getRefreshToken() {
  return Cookies.get(refreshTokenKey);
}

export function setRefreshToken(refreshToken: string, maxAge: number) {
  return Cookies.set(refreshTokenKey, refreshToken, {
    expires: maxAge / 86400
  });
}

export const removeRefreshToken = () => Cookies.remove(refreshTokenKey);
