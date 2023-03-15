import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    categories: [
        'Все',
        'Мясные',
        'Вегетерианские',
        'Гриль',
        'Острые',
        'Закрытые',
    ],
    sortTypes: [
        {name: 'популярности (по возрастанию)', sort: 'rating'},
        {name: 'популярности (по убыванию)', sort: '-rating'},
        {name: 'цене (по возрастанию)', sort: 'price'},
        {name: 'цене (по убыванию)', sort: '-price'},
        {name: 'алфавиту (по возрастанию)', sort: 'name'},
        {name: 'алфавиту (по убыванию)', sort: '-name'},
    ],
    sortActiveIndex: 0,
    searchValue: '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortActiveIndex(state, action) {
            state.sortActiveIndex = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        }
    },
})

export const {setCategoryId, setSortActiveIndex, setSearchValue} = filterSlice.actions

export default filterSlice.reducer