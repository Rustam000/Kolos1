import mem from "mem";
import { axiosPublic } from "./axiosPublic";

export async function refreshAccessToken() {
  const oldRefreshToken = localStorage.getItem("refresh");

  try {
    const response = await axiosPublic.post("/user/token/refresh/", {
      refresh: oldRefreshToken,
    });
    const { access: newAccessToken } = response.data;
    console.log("refreshTokenFn new access token: ", access);
    if (!newAccessToken) {
      localStorage.clear();
    }

    localStorage.setItem("access", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.warn(error);
    localStorage.clear();
  }
}

/* export const memoizedRefreshAccessToken = mem(refreshAccessToken, {
  maxAge: 5000,
}); */
