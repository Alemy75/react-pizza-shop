import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../store/slices/filterSlice";

const Categories = (props) => {
    const {categories} = useSelector(state => state.filter)
    const dispatch = useDispatch()

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, index) => (
                        <li
                            key={value}
                            onClick={() => dispatch(setCategoryId(index))}
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