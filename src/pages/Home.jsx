import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

const Home = (props) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [activeIndex, setActiveIndex] = useState(0)
    const [sortActiveIndex, setSortActiveIndex] = useState(0)

    const setIndexHandler = (index) => {
        setActiveIndex(index)
    }

    const sortTypes = [
        {name: 'популярности' , sort: 'rating'},
        {name: 'цене' , sort: 'price'},
        {name: 'алфавиту' , sort: 'name'},
    ]

    const catUrl = activeIndex === 0 ? '?' : `?category=${activeIndex}&`

    const sortUrl = `sortBy=${sortTypes[sortActiveIndex].sort}&order=asc&`

    const queryUrl = `https://640c55b7a3e07380e8f1f0b6.mockapi.io/pizzas${catUrl}${sortUrl}`

    useEffect(() => {
        try {
            setIsLoading(true)
            fetch(queryUrl)
                .then(res => res.json())
                .then(data => {
                    setItems(data)
                    setIsLoading(false)

                })
            window.scrollTo(0, 0)
        } catch(e) {
            console.log(e)
        }
    }, [activeIndex, sortActiveIndex])

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
                    ?
                    [...new Array(8)].map((_, index) =>
                        <PizzaBlockSkeleton key={index}/>
                    )
                    :
                    items.map(obj => <PizzaBlock
                        key={obj.id}
                        {...obj}
                    />)
                }
            </div>
        </div>
    );
};

export default Home;