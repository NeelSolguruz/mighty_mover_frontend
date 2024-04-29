import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat_from: null,
  lng_from: null,
  lat_to: null,
  lng_to: null,
};
const map_slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    map_lat_from: (state, action) => {
      console.log(action.payload);
      state.lat_from = action.payload.lat;
      state.lng_from = action.payload.lng;
    },
    map_lat_to: (state, action) => {
      console.log(action.payload);
      state.lat_to = action.payload.lat;
      state.lng_to = action.payload.lng;
    },
  },
});
export const { map_lat_from, map_lat_to } = map_slice.actions;
export default map_slice.reducer;
