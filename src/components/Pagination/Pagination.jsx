import React, {useState} from 'react';
import ReactPaginate from "react-paginate";
import s from './Pagination.module.scss'
import {setCurrentPage} from "../../store/slices/filterSlice";
import {useDispatch, useSelector} from "react-redux";

const Pagination = (props) => {
    const [active, setActive] = useState()
    const dispatch = useDispatch()
    const {currentPage} = useSelector(state => state.filter)

    return (
        <ReactPaginate
            className={s.item}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => {
                dispatch(setCurrentPage(e.selected + 1))
            }}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;