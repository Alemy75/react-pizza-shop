import React from 'react';

const Categories = (props) => {
    const categories = [
        'Все',
        'Мясные',
        'Вегетерианские',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, index) => (
                        <li
                            key={value}
                            onClick={() => props.onClickCategory(index)}
                            className={
                                props.value === index
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