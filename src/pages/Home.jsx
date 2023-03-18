import React, {useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {setFilters} from "../store/slices/filterSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {sorting, sortTypes, categoryId, searchValue, currentPage} = useSelector(state => state.filter)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Функция запроса пицц
    const fetchPizzas = () => {
        setIsLoading(true)
        const catUrl = categoryId === 0 ? '' : `&category=${categoryId}`
        const sortUrl = `${sorting.sort.replace('-', '')}`
        const orderUrl = `${sorting.sort.includes('-') ? 'desc' : 'asc'}`
        const searchUrl = searchValue ? `&search=${searchValue}` : ''
        console.log(`https://640c55b7a3e07380e8f1f0b6.mockapi.io/pizzas?page=${currentPage}&limit=4${catUrl}&sortBy=${sortUrl}&order=${orderUrl}${searchUrl}`)
        axios.get(`https://640c55b7a3e07380e8f1f0b6.mockapi.io/pizzas?page=${currentPage}&limit=4${catUrl}&sortBy=${sortUrl}&order=${orderUrl}${searchUrl}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })
    }

    // Если был первый рендер, проверяем URL и запихиваем параметры в редакс
    useEffect(() => {
        if (window.location.search !== '') {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortTypes.find(item => item.sort === params.sortProperty)

            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
    }, [])

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sorting.sort,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sorting.sort, currentPage])

    // Если был первый рендер то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)
        const getData = setTimeout(() => {
            if (!isSearch.current) {
                fetchPizzas()
            }
        }, 500)
        isSearch.current = false
        return () => clearTimeout(getData)

    }, [categoryId, sorting.sort, searchValue, currentPage])

    const skeletons = [...new Array(4)].map((_, index) => <PizzaBlockSkeleton key={index}/>)

    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeletons
                    : pizzas.length > 0
                        ? pizzas
                        : <p className="not__items">По результатам поиска ничего не найдено :(</p>
                }
            </div>
            <Pagination/>
        </div>
    );
};

export default Home;