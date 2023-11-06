import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPublic } from "../api/axiosPublic";
import { ACCESS_DENIED_ERROR } from "../common/constants";

export const logUserIn = createAsyncThunk(
  "auth/logUserIn",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosPublic.post("/users/login/", formData);
      const data = response.data;
      localStorage.setItem("user", "admin");
      localStorage.setItem("access", data?.token?.access);
      localStorage.setItem("refresh", data?.token?.refresh);
      return data;
    } catch (error) {
      localStorage.clear();
      console.warn(error); /*  */
      return Promise.reject(error);
    }
  },
);

export const logUserOut = createAsyncThunk(
  "auth/logUserOut",
  async (_, thunkAPI) => {
    localStorage.clear();
  },
);

const initialState = {
  user: localStorage.getItem("user"),
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      if (state.error === ACCESS_DENIED_ERROR) return state;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logUserIn.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logUserIn.fulfilled, (state, action) => {
      state.user = "admin";
      state.isLoading = false;
    });
    builder.addCase(logUserIn.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = "try_again";
    });
    builder.addCase(logUserOut.fulfilled, (state, action) => {
      state.user = null;
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
