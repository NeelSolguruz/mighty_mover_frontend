import { createSlice } from "@reduxjs/toolkit";

interface initialState {
    token:null|string,
    
}

const initialState:initialState = {
    token:null,
  
}

const driverSlice = createSlice({
    name:"driver",
    initialState:initialState,
    reducers:{
     driverAdd:(state, action) => {
        console.log(action.payload)
        state.token = action.payload;
     }  
    }
})

export const {driverAdd} = driverSlice.actions;
export default driverSlice.reducer;