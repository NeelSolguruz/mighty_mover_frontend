import { createSlice } from "@reduxjs/toolkit";

interface initialState {
    token:null|string,
    driver:null|string,
    email:null|string,
    
}

const initialState:initialState = {
    token:null,
    driver:null,
    email:null
    
}

const driverSlice = createSlice({
    name:"driver",
    initialState:initialState,
    reducers:{
     driverAdd:(state, action) => {
        state.token = action.payload.token;
        state.driver = action.payload.driver;
        state.email = action.payload.email;
     },
     driverUpdate:(state,action) => {
        state.driver = action.payload;
        const data = localStorage.getItem("driver") || null;
        const token = data && JSON.parse(data || "");
        localStorage.setItem(
          "driver",
          JSON.stringify({ ...token, driver: action.payload })
        );
     },
     driverLogout:(state) => {
        (state.token = null), (state.driver = null), (state.email = null);
        localStorage.clear();
     }
    }
})

export const {driverAdd,driverUpdate,driverLogout} = driverSlice.actions;
export default driverSlice.reducer;