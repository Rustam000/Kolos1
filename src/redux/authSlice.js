import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCESS_DENIED_ERROR, ENDPOINTS } from "../common/constants";
import { axiosPublic } from "../api/axiosPublic";
import { axiosPrivate } from "../api/axiosPrivate";

export const logUserIn = createAsyncThunk(
  "auth/logUserIn",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosPublic.post(ENDPOINTS.login, formData);
      const data = response.data;
      localStorage.setItem("user", data?.role?.username);
      localStorage.setItem("access", data?.access);
      localStorage.setItem("refresh", data?.refresh);
      return data;
    } catch (error) {
      localStorage.clear();
      console.warn(error); /*  */
      return Promise.reject(error);
    }
  },
);

export const pingTestEndpoint = createAsyncThunk(
  "auth/pingTestEndpoint",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get("/users/test/");
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.warn(error);
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
      state.user = action.payload.role?.username;
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
