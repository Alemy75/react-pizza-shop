import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useSelector} from "react-redux";

const Home = () => {
    const {sortTypes, sortActiveIndex, categoryId, searchValue} = useSelector(state => state.filter)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const catUrl = categoryId === 0 ? '' : `&category=${categoryId}`
    const sortUrl = `${sortTypes[sortActiveIndex].sort.replace('-', '')}`
    const orderUrl = `${sortTypes[sortActiveIndex].sort.includes('-') ? 'desc' : 'asc'}`
    const searchUrl = searchValue ? `&search=${searchValue}` : ''
    const queryUrl = `https://640c55b7a3e07380e8f1f0b6.mockapi.io/pizzas?page=${currentPage}&limit=4${catUrl}&sortBy=${sortUrl}&order=${orderUrl}${searchUrl}`

    const skeletons = [...new Array(4)].map((_, index) =>
        <PizzaBlockSkeleton key={index}/>
    )
    const pizzas = items
        .map(obj => <PizzaBlock
            key={obj.id}
            {...obj}
        />)

    useEffect(() => {
        setIsLoading(true)
        fetch(queryUrl)
            .then(res => res.json())
            .then(data => {
                setItems(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        window.scrollTo(0, 0)
    }, [categoryId, sortActiveIndex, searchValue, queryUrl])

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
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
};

export default Home;