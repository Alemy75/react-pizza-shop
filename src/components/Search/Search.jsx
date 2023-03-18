import React, {useRef, useState} from 'react';
import s from './Search.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../store/slices/filterSlice";

const Search = () => {
    const searchValue = useSelector(state => state.filter.searchValue)
    const dispatch = useDispatch()
    const inputRef = useRef()

    const onClearInput = () => {
        dispatch(setSearchValue(''))
        inputRef.current.focus()
    }

    return (
        <div className={s.root}>
            <svg className={s.icon} fill="none" height="24" stroke="currentColor" strokeLinecap="round"
                 strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"
                 xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" x2="16.65" y1="21" y2="16.65"/>
            </svg>
            <input ref={inputRef} value={searchValue} onChange={event => dispatch(setSearchValue(event.target.value))} className={s.input} type="text" placeholder="Пицца пеперони с перцем холопенье..."/>
            {
                searchValue &&
                <svg onClick={() => onClearInput()} className={s.clearIco} xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                    <path d="M19 5L5 19M5.00001 5L19 19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            }
        </div>
    );
};

export default Search;