import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../../interfaces";
import { addItemToCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();
interface IInitialState {
  cartProducts: ICartItem[];
}
const initialState: IInitialState = {
  cartProducts: [],
};

const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      state.cartProducts = addItemToCart(action.payload, state.cartProducts);
      toast({
        title: "Added to Your Cart.",
        // description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    removeFromCart: (state, action: PayloadAction<ICartItem>) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
      toast({
        title: "Your Cart is empty.",
        // description: "",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    },
    incrementProductQt: (state, action: PayloadAction<ICartItem>) => {
      const foundItem = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem && foundItem?.qty < foundItem.attributes.stock) {
        state.cartProducts = state.cartProducts.map((item) =>
          item.id === action.payload.id
            ? { ...action.payload, qty: action.payload.qty + 1 }
            : action.payload
        );
      }
    },
    decrementProductQty: (state, action: PayloadAction<ICartItem>) => {
      const foundItem = state.cartProducts.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem && foundItem?.qty > 1) {
        state.cartProducts = state.cartProducts.map((item) =>
          item.id === action.payload.id
            ? { ...action.payload, qty: action.payload.qty + -1 }
            : action.payload
        );
      } else {
        const filterItems = state.cartProducts.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartProducts = filterItems;
        toast({
          title: "Removed from Your Cart.",
          // description: "",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  },
});

export const {
  addToCart,
  incrementProductQt,
  decrementProductQty,
  removeFromCart,
  clearCart,
} = CartSlice.actions;
export default CartSlice.reducer;
