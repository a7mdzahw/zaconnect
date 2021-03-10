import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], loading: true },
  reducers: {
    productsRecieved: (products, action) => {
      products.list = action.payload;
      products.loading = false;
    },
    productRemoved: (products, action) => {
      products.list = products.list.filter((p) => p.photoURL !== action.payload.photoURL);
    },
    addProduct: (products, action) => {
      products.list.unshift(action.payload);
    },
  },
});

export const { productsRecieved, productRemoved, addProduct } = productsSlice.actions;

export default productsSlice.reducer;
