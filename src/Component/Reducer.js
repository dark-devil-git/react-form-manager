import { createSlice } from "@reduxjs/toolkit";


export const Slice=createSlice({
    name:"task-manager",
    initialState:{
        arr:[] 
    },
    reducers:{
        updateArr:(state,action)=>{
            state.arr=action.payload
        } 
    }
})
export default Slice.reducer
export const{updateArr}=Slice.actions