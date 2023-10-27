import mem from "mem";

import { axiosPublic } from "./axiosPublic";

async function refreshTokenFn() {
  const oldTokens = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await axiosPublic.post(
      "/user/refresh" /* to be changed */,
      {
        refresh: oldTokens.refresh,
      },
    );

    const { token } = response.data;
    //will there be a new refresh token?
    if (!token?.access) {
      /* !token?. looks sus */ localStorage.removeItem("token");
      localStorage.removeItem("user"); /* if any */
    }

    localStorage.setItem("token", JSON.stringify(token));

    return token;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge: 5000,
});
