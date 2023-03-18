import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // Стейт категории
    categoryId: 0,
    categories: [
        'Все',
        'Мясные',
        'Вегетерианские',
        'Гриль',
        'Острые',
        'Закрытые',
    ],

    // Стейт сортировки
    sortTypes: [
        {name: 'популярности (по возрастанию)', sort: 'rating'},
        {name: 'популярности (по убыванию)', sort: '-rating'},
        {name: 'цене (по возрастанию)', sort: 'price'},
        {name: 'цене (по убыванию)', sort: '-price'},
        {name: 'алфавиту (по возрастанию)', sort: 'name'},
        {name: 'алфавиту (по убыванию)', sort: '-name'},
    ],
    sorting: {
        name: 'популярности (по возрастанию)',
        sort: 'rating',
    },
    sortActiveIndex: 0,

    // Стейт поиска
    searchValue: '',

    // Стейт пагинации
    currentPage: 1
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sortActiveIndex = action.payload
            state.sorting = state.sortTypes[action.payload]
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.sorting = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        }
    },
})

export const {setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters, setSorting} = filterSlice.actions

export default filterSlice.reducer