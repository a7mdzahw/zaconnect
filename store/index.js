import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import reducer from "./reducer";

export const store = configureStore({ reducer });
export const persistor = persistStore(store);
