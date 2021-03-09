import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const cartSlice = createSlice({
  name: "cart",
  initialState: { hidden: true, cartItems: [] },
  reducers: {
    cartToggeled: (cart, action) => {
      cart.hidden = !cart.hidden;
    },
    itemAdded: (cart, action) => {
      add_item(cart.cartItems, action.payload);
    },
    itemRemoved: (cart, action) => {
      const index = cart.cartItems.findIndex(
        (i) => i.photoURL === action.payload.photoURL
      );
      cart.cartItems.splice(index, 1);
    },
  },
});

const add_item = (items, item) => {
  const exists = items.find((i) => i.photoURL === item.photoURL);

  if (!exists) {
    items.push({ ...item, quantity: 1 });
  } else {
    exists.quantity += 1;
  }
};

export const itemsCount = createSelector(
  (state) => state.cart,
  (cart) => cart.cartItems.reduce((acum, item) => item.quantity + acum, 0)
);

export const itemsTotal = createSelector(
  (state) => state.cart,
  (cart) =>
    cart.cartItems.reduce((acum, item) => item.quantity * item.price + acum, 0)
);

export const { cartToggeled, itemAdded, itemRemoved } = cartSlice.actions;
export default cartSlice.reducer;
