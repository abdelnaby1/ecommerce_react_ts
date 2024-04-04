import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  isOpenCartDrawer: boolean;
  onOpenCartDrawer: boolean;
  onCloseCartDrawer: boolean;
}
const initialState: IInitialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const GlobalSlice = createSlice({
  initialState,
  name: "global",
  reducers: {
    onOpenCartDrawer: (state) => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawer: (state) => {
      state.onCloseCartDrawer = false;
      state.isOpenCartDrawer = false;
    },
  },
});

export const { onOpenCartDrawer, onCloseCartDrawer } = GlobalSlice.actions;
export default GlobalSlice.reducer;
