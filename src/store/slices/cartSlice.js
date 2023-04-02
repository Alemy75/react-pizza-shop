import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            let findItem = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size)
            if (findItem) {
                findItem.count++
            } else {
                let item = {
                    ...action.payload,
                    count: 1
                }                
                state.items = [
                    ...state.items, item
                ]
            }
            state.totalPrice = state.items.reduce((sum, obj) => { 
                return sum + obj.price * obj.count
            }, 0)
        },
        clearItems(state, action) {
            state.items = []
        },
        removeItem(state, action) {
            let findItem = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size)
            if (findItem) {
                state.items.pop(findItem)
            }
        },
        decrementItem(state, action) {
            let findItem = state.items.find(obj => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size)
            if (findItem) {
                if (findItem.count === 1) {
                    state.items.pop(findItem)
                } else {
                    findItem.count--  
                }
            } 
            state.totalPrice = state.items.reduce((sum, obj) => { 
                return sum + obj.price * obj.count
            }, 0)
        },
    },
})

export const {addItem, clearItems, removeItem, decrementItem} = cartSlice.actions

export default cartSlice.reducer