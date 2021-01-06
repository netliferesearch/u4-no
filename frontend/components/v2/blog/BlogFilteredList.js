import React, { useState, useEffect } from 'react';
import Pagination from 'react-paginating';
import dateToString from '../../../helpers/dateToString';
import { BlogEntriesFilter } from './BlogEntriesFilter';
import { TextButton } from '../buttons';
import { BlogAuthorsShortList } from './BlogAuthorsShortList';
import { ArrowPrev } from '../icons/ArrowPrev';
import { ArrowNext } from '../icons/ArrowNext';
import { DoubleChevron } from '../icons/DoubleChevron';
import LinkToItem from '../../LinkToItem';
import {
  clearBlogFilters,
  updateBlogFilters,
  updateBlogPageNum,
} from '../../../helpers/redux-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const applyFliters = (filters, elements) => {
  if (filters.length) {
    let filtered = elements.filter(element => {
      if (element.topics) {
        return element.topics.find(topic => filters.find(item => item.title === topic.title))
          ? true
          : false;
      }
    });
    return filtered;
  } else {
    return elements;
  }
};

const BlogFilteredList = props => {
  const {
    blogFilters,
    updateBlogFilters,
    blogPageNum,
    updateBlogPageNum,
    clearBlogFilters,
    blogEntries = [],
    topics = [],
  } = props;

  const [filtersResults, setFiltersResults] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const limit = blogFilters.length === 0 ? 7 : 9;
  const maxPagesListed = 5;
  const offset = (blogPageNum - 1) * limit;
  const total = filtersResults.length ? filtersResults.length : currentResults.length * limit;
  let d = currentResults.length < limit ? 1 : currentResults.length;

  const handlePageChange = (page, e) => {
    updateBlogPageNum(page);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.search.indexOf('blogPageNum') === -1) {
        updateBlogPageNum(1);
      }
    }
  }, []);

  const handleRemove = () => {
    clearBlogFilters();
    updateBlogPageNum(1);
  };

  useEffect(
    () => {
      setFiltersResults(applyFliters(blogFilters, blogEntries));
    },
    [blogFilters]
  );

  useEffect(
    () => {
      setCurrentResults(filtersResults.slice(offset, offset + limit));
    },
    [filtersResults, offset]
  );

  useEffect(
    () => {
      setPageCount(
        Math.ceil(filtersResults.length / d) > maxPagesListed
          ? maxPagesListed
          : Math.ceil(filtersResults.length / d)
      );
    },
    [currentResults, filtersResults]
  );

  return (
    <div>
      <div
        className={`c-blog-index__filters ${
          blogFilters.length ? 'c-blog-index__filters--active' : ''
        }`}
      >
        {blogFilters.length ? (
          <div className="c-blog-index__filters-info">
            <h5>{`${filtersResults.length} Blog articles filtered by: `}</h5>
            <div className="c-blog-index__filters-set">
              {blogFilters.map((f, index) => (
                <span key={index}>
                  {f.title}
                  <span>, </span>
                  {/* <span>{`${
                          filters.length > 1 && index + 1 < filters.length ? ', ' : '. '
                        }`}</span> */}
                </span>
              ))}
              <TextButton onClick={handleRemove} text="Remove all" modifier="ter" />
            </div>
          </div>
        ) : (
          <div className="c-blog-index__filters--none">
            <h5>{`${blogEntries.length} Blog articles`}</h5>
          </div>
        )}
        <BlogEntriesFilter
          topics={topics}
          setFilters={updateBlogFilters}
          filters={blogFilters}
          updateBlogPageNum={updateBlogPageNum}
        />
      </div>
      {currentResults ? (
        <div className="c-blog-index__list">
          {currentResults.map((post, index) => (
            <LinkToItem type={post._type} slug={post.slug} key={index}>
              <a
                className={`c-blog-index__item c-blog-index__item${
                  blogFilters.length === 0 && index === 0 ? '--full-width' : ''
                }`}
              >
                {post.imageUrl ? (
                  <div
                    className="c-blog-index__featured-image"
                    style={{
                      backgroundImage: `url('${post.imageUrl}${
                        blogFilters.length === 0 && index === 0
                          ? '?w=544&h=362&fit=crop&crop=focalpoint'
                          : '?w=332&h=175&fit=crop&crop=focalpoint'
                      }')`,
                    }}
                  />
                ) : null}
                <div className="text">
                  <div>
                    <h3 className="publication-headline">{post.title}</h3>
                    <p className="c-blog-index-item__intro">{post.standfirst}</p>
                  </div>
                  <div>
                    <p className="c-blog-index__name">
                      {post.authors.length > 0 ? (
                        <BlogAuthorsShortList authors={post.authors} />
                      ) : null}
                    </p>
                    <p className="c-blog-index__date">
                      {post.date ? dateToString({ start: post.date.utc }) : null}
                    </p>
                  </div>
                </div>
              </a>
            </LinkToItem>
          ))}
        </div>
      ) : null}
      {filtersResults && filtersResults.length > 0 && (
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
                  activePage = { color: '$brand-dark' };
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
              {totalPages > pageCount ? '...' : null}
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
      )}
    </div>
  );
};

const mapStateToProps = ({ blogFilters = [], blogPageNum = 1 }) => ({ blogFilters, blogPageNum });

const mapDispatchToProps = dispatch => ({
  updateBlogFilters: bindActionCreators(updateBlogFilters, dispatch),
  clearBlogFilters: bindActionCreators(clearBlogFilters, dispatch),
  updateBlogPageNum: bindActionCreators(updateBlogPageNum, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogFilteredList);
