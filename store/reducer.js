import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import productReducer from "./products";
import userReducer from "./users";

const reducer = combineReducers({
  products: productReducer,
  users: userReducer,
});

export default persistReducer(
  { key: "root", whitelist: ["users"], storage },
  reducer
);
