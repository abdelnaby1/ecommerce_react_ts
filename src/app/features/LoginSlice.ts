import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios/axiosInstance";
import { RootState } from "../Stror";

import { createStandaloneToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import CookieService from "../../services/CookieService";
import { CookieSetOptions } from "universal-cookie";
const { toast } = createStandaloneToast();

interface userLoginData {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    confirmed: string;
  };
}
export interface LoginState {
  loading: boolean;
  data: userLoginData | null;
  error?: AxiosError | unknown;
}

const initialState: LoginState = {
  loading: false,
  data: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: { identifier: string; password: string }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { data } = await axiosInstance.post("/api/auth/local", user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  initialState,
  name: "login",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      userLogin.fulfilled,
      (state, action: PayloadAction<userLoginData>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;

        const date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 3); //after 3 days
        const options: CookieSetOptions = { path: "/", expires: date };
        CookieService.set("jwt", action.payload.jwt, options);
      }
    );
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      const error = action.payload as AxiosError;
      toast({
        title:
          "data" in action.error
            ? (error?.response?.data as { error: { message: string } }).error
                .message
            : action.error.message,
        description: (error?.response?.data as { error: { message: string } })
          .error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  },
});
export const selectLogin = (state: RootState) => state.login;
export default loginSlice.reducer;
