import { setCookie, getCookie, eraseCookie } from "../Cookies";

export const getAuthToken = () => {
  return getCookie("SAID");
};

export const setAuthDetails = (accessToken) => {
  setCookie("SAID", accessToken, 1);
  localStorage.setItem("token", accessToken);
};

export const deleteAuthDetails = () => {
  eraseCookie("SAID");
};
