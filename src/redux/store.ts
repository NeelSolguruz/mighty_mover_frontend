import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import driverReducer from "./driverSlice";
import mapreducer from "./mapSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  user: useReducer,
});
const driverRootReducer = combineReducers({
  driver: driverReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const driverpersistConfig = {
  key: "DriverRoot",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const driverpersistedReducer = persistReducer(
  driverpersistConfig,
  driverRootReducer
);
export const makeStore = configureStore({
  reducer: {
    user: persistedReducer,
    driver: driverpersistedReducer,
    lat_lng: mapreducer,
  },
});

export default makeStore;
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore.getState>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;
export const persistor = persistStore(makeStore);
