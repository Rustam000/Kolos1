import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  /**@type {string|null} */
  user: localStorage.getItem("user"),
  /**@type {string|null} */
  accessToken: null,
  /**@type {string|null} */
  error: null,
  /**@type {number} */
  failedAttempts: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      if (
        action.payload.username === "dev54321" &&
        action.payload.password === "dev54321"
      ) {
        state.error = null;
        state.user = "dev54321";
      } else {
        state.user = null;
        state.failedAttempts += 1;
        state.error = state.failedAttempts >= 4 ? "access_denied" : "try_again";
      }
    },
    logUserOut: () => {
      return { ...initialState, user: null };
    },
    clearError: (state) => {
      if (state.error === "access_denied") return state;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logUserIn.fulfilled, (state, action) => {
      console.log("fulfilled", action);
    });
    builder.addCase(logUserIn.rejected, (state, action) => {
      console.log("rejected", action);
    });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

////////////////////////////////////////////////////////////////

export const logUserIn = createAsyncThunk(
  "auth/logUserIn",
  async (formData, thunkAPI) => {
    const response = await axios.post(
      "http://51.20.115.221/api/v1/users/login/",
      formData,
    );
    /* thunkAPI.dispatch(authActions.logUserIn(formData));
    if (formData.username === "dev54321" && formData.password === "dev54321") {
      localStorage.setItem("user", "dev54321");
    } */
    return response.data;
  },
);

export const logUserOut = createAsyncThunk(
  "auth/logUserOut",
  async (_, thunkAPI) => {
    localStorage.removeItem("user");
    thunkAPI.dispatch(authActions.logUserOut());
  },
);
