import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

const Home = (props) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            fetch('https://640c55b7a3e07380e8f1f0b6.mockapi.io/pizzas/')
                .then(res => res.json())
                .then(data => {
                    setItems(data)
                    setIsLoading(false)
                })
        } catch(e) {
            console.log(e)
        }
    }, [])

    return (
        <React.Fragment>
            <div className="content__top">
                <Categories/>
                <Sort/>
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
        </React.Fragment>
    );
};

export default Home;