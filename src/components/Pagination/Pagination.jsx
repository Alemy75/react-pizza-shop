import React from 'react';
import ReactPaginate from "react-paginate";
import s from './Pagination.module.scss'

const Pagination = (props) => {
    return (
        <ReactPaginate
            className={s.item}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => props.onChangePage(e.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;