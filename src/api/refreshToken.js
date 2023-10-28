import mem from "mem";

import { axiosPublic } from "./axiosPublic";

export async function refreshTokenFn() {
  const oldRefreshToken = localStorage.getItem("refresh");

  try {
    const response = await axiosPublic.post("/user/token/refresh/", {
      refresh: oldRefreshToken,
    });
    const { access: newAccessToken } = response.data;
    console.log("refreshTokenFn new access token: ", access);
    if (!newAccessToken) {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      localStorage.removeItem("user"); /* if any */
    }

    localStorage.setItem("access", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.warn(error);
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    localStorage.removeItem("user"); /* if any */
  }
}

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge: 5000,
});
