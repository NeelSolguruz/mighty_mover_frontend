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
        state.driver = action.payload.name;
        state.email = action.payload.email;
     }  
    }
})

export const {driverAdd} = driverSlice.actions;
export default driverSlice.reducer;