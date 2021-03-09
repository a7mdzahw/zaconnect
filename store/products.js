import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], loading: true },
  reducers: {
    productsRecieved: (products, action) => {
      products.list = action.payload;
      products.loading = false;
    },
  },
});

export default productsSlice.reducer;
