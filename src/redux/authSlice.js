import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  failedAttempts: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      if (action.payload.login === "dev" && action.payload.password === "dev") {
        state.error = null;
        state.user = "dev";
      } else {
        state.user = null;
        state.failedAttempts += 1;
        state.error = state.failedAttempts >= 4 ? "access_denied" : "try_again";
      }
    },
  },
  extraReducers: (builder) => {
    //
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
