import { configureStore } from "@reduxjs/toolkit";
import Productreduser from './product-reduser/product-reduser'

export const store = configureStore({
    reducer:{
        Attractor:Productreduser,
    }
})