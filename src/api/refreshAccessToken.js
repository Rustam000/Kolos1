import { axiosPublic } from "./axiosPublic";

export async function refreshAccessToken(refreshToken) {
  try {
    const response = await axiosPublic.post("/users/token/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    return newAccessToken;
    //
  } catch (error) {
    console.warn(error);
  }
}
