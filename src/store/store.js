import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import languageReducer from "./reducers/languageReducer";
import themeReducer from "./reducers/themeReducer";
import wishlistReducer from "./reducers/wishlistReducer";
import modalReducer from "./reducers/modalReducer";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["cart", "theme"],
};

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  language: languageReducer,
  theme: themeReducer,
  wishlist: wishlistReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
