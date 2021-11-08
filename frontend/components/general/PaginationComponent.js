import React from 'react';
import Pagination from 'react-paginating';
import { ArrowNextPage, ArrowPrevPage, ArrowFirstPage, ArrowLastPage } from '../icons/PageArrows';
import { useDispatch } from 'react-redux';
import { updateBlogPageNum, updateSearchPageNum } from '../../helpers/redux-store';

export const PaginationComponent = ({ total, limit, maxPagesListed = 5, currentPage, search }) => {
  const dispatch = useDispatch();
  const d = total < limit ? 1 : Math.ceil(total / limit);
  const pageCount = Math.ceil(total / d) > maxPagesListed ? maxPagesListed : Math.ceil(total / d);
  const handlePageChange = (page, e) => {
    !search ? dispatch(updateBlogPageNum(page)) : dispatch(updateSearchPageNum(page));
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <Pagination total={total} limit={limit} pageCount={pageCount} currentPage={currentPage}>
        {({ pages, currentPage, previousPage, nextPage, totalPages, getPageItemProps }) => (
          <ul className="paginator-list">
            {currentPage > 2 ? (
              <li>
                <button
                  className={`pagination-item first-button ${currentPage <= 1 ? 'disabled' : ''}`}
                  {...getPageItemProps({
                    pageValue: 1,
                    onPageChange: handlePageChange,
                  })}
                >
                  <ArrowFirstPage />
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
                  <ArrowPrevPage />
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
                    className={`pagination-item ${currentPage === page ? 'active ' : ''}`}
                    {...getPageItemProps({
                      pageValue: page,
                      key: page,
                      onPageChange: handlePageChange,
                    })}
                  >
                    {currentPage === page ? <div>{page}</div> : page}
                  </button>
                </li>
              );
            })}
            {totalPages > pageCount && totalPages - currentPage > 2 ? (
              <div className="pagination-item pointer-events--none">...</div>
            ) : null}
            {totalPages > pageCount && totalPages - currentPage > 2 ? (
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
                  <ArrowNextPage />
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
                  <ArrowLastPage />
                </button>
              </li>
            ) : null}
          </ul>
        )}
      </Pagination>
    </div>
  );
};
