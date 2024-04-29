import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import driverReducer from "./driverSlice";
import mapreducer from "./mapSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: useReducer,
      driver: driverReducer,
      lat_lng: mapreducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
