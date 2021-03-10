import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cart from "./cart";
import productReducer from "./products";
import userReducer from "./users";

const reducer = combineReducers({
  products: productReducer,
  users: userReducer,
  cart: cart,
});

export default persistReducer(
  { key: "root", whitelist: [ "cart"], storage },
  reducer
);
