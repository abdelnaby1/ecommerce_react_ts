import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  isOnline: boolean;
}
const initialState: IInitialState = {
  isOnline: true,
};

const NetworkSlice = createSlice({
  initialState,
  name: "network",
  reducers: {
    networkMode: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const { networkMode } = NetworkSlice.actions;
export default NetworkSlice.reducer;
