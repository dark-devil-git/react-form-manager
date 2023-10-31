import { configureStore } from "@reduxjs/toolkit";
import Reducerarr from "./Reducer"

export const Store=configureStore({
    reducer:{
        data:Reducerarr
    }
})