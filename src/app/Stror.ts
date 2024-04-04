import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./features/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import CartSlice from "./features/CartSlice";
import GlobalSlice from "./features/GlobalSlice";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { productsApiSlice } from "./services/products";
import NetworkSlice from "./features/NetworkSlice";

const persistConfig = {
  key: "cart",
  storage,
};
const persistCart = persistReducer(persistConfig, CartSlice);
const store = configureStore({
  reducer: {
    login: LoginSlice,
    cart: persistCart,
    global: GlobalSlice,
    network: NetworkSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productsApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

export const persister = persistStore(store);
