import { ICartItem } from "../interfaces";

export const addItemToCart = (cartItem: ICartItem, cartItems: ICartItem[]) => {
  const isItemExists = cartItems.find((item) => item.id === cartItem.id);
  if (isItemExists) {
    return cartItems.map((item) =>
      item.id === cartItem.id ? { ...item, qty: item.qty + 1 } : item
    );
  }
  return [...cartItems, { ...cartItem, qty: 1 }];
};
