import React from "react";
import "./Pagination.css";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount = 0, currentPage, onPageChange }) => {
    if (pageCount != 0) {
        return (
            <>
                <ReactPaginate
                    previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                    nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    forcePage={currentPage}
                    onPageChange={onPageChange}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item prev-item"
                    nextClassName="page-item next-item"
                    previousLinkClassName="page-link nav-link"
                    nextLinkClassName="page-link nav-link"
                    breakClassName="page-item break-item"
                    breakLinkClassName="page-link break-link"
                    activeClassName="active"
                    disabledClassName="disabled"
                />
            </>
        );
    } else {
        return null;
    }

};

export default Pagination;