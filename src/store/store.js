import {configureStore} from '@reduxjs/toolkit'
import filterSlice from "./slices/filterSlice";
import pizzaSlice from "./slices/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        pizza: pizzaSlice,
    }
})