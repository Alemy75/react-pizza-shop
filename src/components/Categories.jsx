import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../store/slices/filterSlice";

const Categories = (props) => {
    const {categories, categoryId} = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const onClickHandler = (index) => {
        dispatch(setCategoryId(index))
        dispatch(setCurrentPage(1))
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, index) => (
                        <li
                            key={value}
                            onClick={() => onClickHandler(index)}
                            className={
                                 categoryId === index
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