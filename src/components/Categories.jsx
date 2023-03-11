import React, {useState} from 'react';

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const categories = [
        'Все',
        'Мясные',
        'Вегетерианские',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    const setIndexHandler = (index) => {
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, index) => (
                        <li
                            key={value}
                            onClick={() => setIndexHandler(index)}
                            className={
                                activeIndex === index
                                    ? 'active'
                                    : ''
                            }
                        >
                            {value}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Categories;