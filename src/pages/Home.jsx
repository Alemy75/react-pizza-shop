import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

const Home = (props) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [activeIndex, setActiveIndex] = useState(0)
    const [sortActiveIndex, setSortActiveIndex] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)

    const setIndexHandler = (index) => {
        setActiveIndex(index)
    }

    const sortTypes = [
        {name: 'популярности (по возрастанию)' , sort: 'rating'},
        {name: 'популярности (по убыванию)' , sort: '-rating'},
        {name: 'цене (по возрастанию)' , sort: 'price'},
        {name: 'цене (по убыванию)' , sort: '-price'},
        {name: 'алфавиту (по возрастанию)' , sort: 'name'},
        {name: 'алфавиту (по убыванию)' , sort: '-name'},
    ]

    const catUrl = activeIndex === 0 ? '' : `&category=${activeIndex}`

    const sortUrl = `${sortTypes[sortActiveIndex].sort.replace('-', '')}`

    const orderUrl = `${sortTypes[sortActiveIndex].sort.includes('-') ? 'desc' : 'asc'}`

    const searchUrl = props.searchValue ? `&search=${props.searchValue}` : ''

    const queryUrl = `https://640c55b7a3e07380e8f1f0b6.mockapi.io/pizzas?page=${currentPage}&limit=4${catUrl}&sortBy=${sortUrl}&order=${orderUrl}${searchUrl}`

    const skeletons = [...new Array(4)].map((_, index) =>
        <PizzaBlockSkeleton key={index}/>
    )

    const pizzas = items
        // .filter(el =>
        //     el.name.toLowerCase().includes(props.searchValue.toLowerCase())
        // )
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
    }, [activeIndex, sortActiveIndex, props.searchValue, queryUrl])

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={activeIndex}
                    onClickCategory={(index) => setIndexHandler(index)}
                />
                <Sort
                    value={sortActiveIndex}
                    onClickSort={(index) => setSortActiveIndex(index)}
                    sortTypes={sortTypes}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoading
                    ? skeletons
                    : pizzas.length > 0
                        ? pizzas
                        : <p>По результатам поиска ничего не найдено :(</p>
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
};

export default Home;