import React from 'react';
import s from './Search.module.scss'

const Search = (props) => {
    return (
        <div className={s.root}>
            <svg className={s.icon} fill="none" height="24" stroke="currentColor" stroke-linecap="round"
                 stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                 xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" x2="16.65" y1="21" y2="16.65"/>
            </svg>
            <input value={props.searchValue} onChange={event => props.setSearchValue(event.target.value)} className={s.input} type="text" placeholder="Пицца пеперони с перцем холопенье..."/>
            {
                props.searchValue &&
                <svg onClick={() => props.setSearchValue('')} className={s.clearIco} xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                    <path d="M19 5L5 19M5.00001 5L19 19" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            }
        </div>
    );
};

export default Search;