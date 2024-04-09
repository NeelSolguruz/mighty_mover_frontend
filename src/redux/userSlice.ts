import { createSlice } from "@reduxjs/toolkit";
interface initialState{
    user:string,
    error:string
}
const initialState:initialState={
    user:"null",
    error:"null"
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    

})
export default userSlice.reducer 