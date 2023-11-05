import { axiosPublic } from "./axiosPublic";

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh");

  try {
    const response = await axiosPublic.post("/users/token/refresh/", {
      refresh: refreshToken,
    });
    const { access: newAccessToken } = response.data;
    console.log("new access token: ", newAccessToken);
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
