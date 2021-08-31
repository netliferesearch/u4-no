import React, { useState, useEffect } from 'react';
import Pagination from 'react-paginating';
import { ArrowNext } from '../icons/ArrowNext';
import { ArrowPrev } from '../icons/ArrowPrev';
import { DoubleChevron } from '../icons/DoubleChevron';
import { connect, useDispatch } from 'react-redux';
import { clearBlogFilters, updateBlogFilters, updateBlogPageNum } from '../../helpers/redux-store';

export const PaginationComponent = ({ total, limit, pageCount, blogPageNum }) => {
  const handlePageChange = (page, e) => {
    dispatch(updateBlogPageNum(page));
    //updateBlogPageNum(page);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };
  const dispatch = useDispatch();

  return (
    <div>
      <Pagination
        className="c-blog-index__paginator"
        total={total}
        limit={limit}
        pageCount={pageCount}
        currentPage={blogPageNum}
      >
        {({
          pages,
          currentPage,
          hasNextPage,
          hasPreviousPage,
          previousPage,
          nextPage,
          totalPages,
          getPageItemProps,
        }) => (
          <ul className="c-blog-index__paginator-list">
            {currentPage > 2 ? (
              <li>
                <button
                  className={`pagination-item first-button ${currentPage <= 1 ? 'disabled' : ''}`}
                  {...getPageItemProps({
                    pageValue: 1,
                    onPageChange: handlePageChange,
                  })}
                >
                  <DoubleChevron />
                </button>
              </li>
            ) : null}
            {currentPage > 1 ? (
              <li>
                <button
                  className={`pagination-item prev-button ${currentPage <= 1 ? 'disabled' : ''}`}
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: handlePageChange,
                  })}
                >
                  <ArrowPrev />
                </button>
              </li>
            ) : null}
            {pages.map(page => {
              let activePage = null;
              if (currentPage === page) {
                activePage = { color: '$dark-blue' };
              }
              return (
                <li key={page}>
                  <button
                    className={`pagination-item ${currentPage === page ? 'active' : ''}`}
                    {...getPageItemProps({
                      pageValue: page,
                      key: page,
                      style: activePage,
                      onPageChange: handlePageChange,
                    })}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
            {totalPages > pageCount ? (
              <div className="pagination-item pointer-events--none">...</div>
            ) : null}
            {totalPages > pageCount ? (
              <li>
                <button
                  className="pagination-item"
                  {...getPageItemProps({
                    pageValue: totalPages,
                    onPageChange: handlePageChange,
                  })}
                >
                  {totalPages}
                </button>
              </li>
            ) : null}
            {currentPage < totalPages ? (
              <li>
                <button
                  className={`pagination-item next-button ${
                    totalPages - 1 >= currentPage ? '' : 'disabled'
                  }`}
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: handlePageChange,
                  })}
                >
                  <ArrowNext />
                </button>
              </li>
            ) : null}
            {currentPage < totalPages - 1 ? (
              <li>
                <button
                  className={`pagination-item last-button ${
                    currentPage >= totalPages ? 'disabled' : ''
                  }`}
                  {...getPageItemProps({
                    pageValue: totalPages,
                    onPageChange: handlePageChange,
                  })}
                >
                  <DoubleChevron />
                </button>
              </li>
            ) : null}
          </ul>
        )}
      </Pagination>
    </div>
  );
};
