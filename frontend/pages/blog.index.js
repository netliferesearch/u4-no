import React, { useState, useEffect } from 'react';
import Pagination from 'react-paginating';
import PropTypes from 'prop-types';
import DataLoader from '../helpers/data-loader';
import { Layout } from '../components/v2';
import dateToString from '../helpers/dateToString';
import { BreadCrumbV2 } from '../components/v2/BreadCrumbV2';
import { BlogEntriesFilter } from '../components/v2/blog/BlogEntriesFilter';
import { TextButton } from '../components/v2/buttons';
import { BlogAuthorsShortList } from '../components/v2/blog/BlogAuthorsShortList';

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

const BlogPage = ({ data: { blogEntries = [], topics = [] } }) => {
  const [filters, setFilters] = useState([]);
  const [filtersResults, setFiltersResults] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = filters.length === 0 ? 7 : 9;
  const maxPagesListed = 5;
  const offset = (currentPage - 1) * limit;
  const total = filtersResults.length ? filtersResults.length : currentResults.length * limit;
  let d = currentResults.length < limit ? 1 : currentResults.length;
  const handlePageChange = (page, e) => {
    setCurrentPage(page);
  };
  useEffect(
    () => {
      setFiltersResults(applyFliters(filters, blogEntries));
      setCurrentPage(1);
    },
    [filters]
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
    <Layout
      hideLogo={false}
      noSearch={false}
      headComponentConfig={{
        title: 'U4 Anti-Corruption Resource Centre',
        description:
          'U4 translates anti-corruption research into practical advice for international development actors. We offer publications, training, workshops, helpdesk, and policy advice to government agencies and the global anti-corruption community.',
        url: 'https://www.u4.no',
        image:
          blogEntries.ImageUrl ||
          'https://cdn.sanity.io/images/1f1lcoov/production/3e59eddc41cd02132774902dd229b24e55dbfcb5-1000x207.png',
      }}
    >
      <hr className="u-section-underline--no-margins" />
      <div className="c-blog-index">
        <section className="o-wrapper">
          <div className="o-wrapper-section">
            <h2 className="u-black-32-headline">Insights from our blog</h2>
            <p className="c-blog-index__intro">
              Practitioners, policymakers, activists, and academics share insights on how to build a
              sustainable and inclusive future by curbing corruption.
            </p>
          </div>
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper">
          <div className="o-wrapper-section">
            <BreadCrumbV2 />
            <div className="c-blog-index__filters">
              {filters.length ? (
                <div className="c-blog-index__filters-info">
                  <h5>{`${filtersResults.length} Blog articles filtered by: `}</h5>
                  <div className="c-blog-index__filters-set">
                    <span>{filters.map(f => f.title).join(', ')}</span>
                    <TextButton
                      onClick={e => setFilters([])}
                      text="Remove All"
                      modifier="text-underline"
                    />
                  </div>
                </div>
              ) : (
                <div className="c-blog-index__filters--none">
                  <h5>{`All ${blogEntries.length} Blog articles`}</h5>
                </div>
              )}
              <BlogEntriesFilter topics={topics} setFilters={setFilters} filters={filters} />
            </div>
            {currentResults ? (
              <div className="c-blog-index__list">
                {currentResults.map((post, index) => (
                  <div
                    key={index}
                    className={`c-blog-index__item c-blog-index__item${
                      filters.length === 0 && index === 0 ? '--full-width' : ''
                    }`}
                  >
                    {post.imageUrl ? (
                      <div
                        className="c-blog-index__featured-image"
                        style={{
                          backgroundImage: `url('${post.imageUrl}${
                            filters.length === 0 && index === 0
                              ? '?w=541&h=362&fit=crop&crop=focalpoint'
                              : '?w=330&h=175&fit=crop&crop=focalpoint'
                          }')`,
                        }}
                      />
                    ) : null}
                    <div className="text">
                      <div>
                        <a href={`blog/${post.slug}`}>
                          <h3 className="publication-headline">{post.title}</h3>
                        </a>
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
                      {/* <div className="topics">
                      {post.topics &&
                        post.topics.map((topic, index) => {
                          return (
                            <span className="topic" key={index}>
                              {topic.title}
                            </span>
                          );
                        })}
                    </div> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {/* {filtersResults && filtersResults.length === 0 && filters.length > 0 && (
              <div>Results(0)</div>
            )} */}
            {filtersResults && filtersResults.length > 0 && (
              <Pagination
                className="c-blog-index__paginator"
                total={total}
                limit={limit}
                pageCount={pageCount}
                currentPage={currentPage}
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
                    {totalPages > pageCount ? (
                      <li>
                        <button
                          className={`pagination-item prev-button ${
                            currentPage <= 1 ? 'disabled' : ''
                          }`}
                          {...getPageItemProps({
                            pageValue: previousPage,
                            onPageChange: handlePageChange,
                          })}
                        >
                          <svg
                            width="10"
                            height="14"
                            viewBox="0 0 10 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.0625 6.5C0.78125 6.78125 0.78125 7.25 1.0625 7.53125L7.125 13.625C7.4375 13.9062 7.90625 13.9062 8.1875 13.625L8.90625 12.9062C9.1875 12.625 9.1875 12.1562 8.90625 11.8438L4.09375 7L8.90625 2.1875C9.1875 1.875 9.1875 1.40625 8.90625 1.125L8.1875 0.40625C7.90625 0.125 7.4375 0.125 7.125 0.40625L1.0625 6.5Z"
                              fill="#BDBDBD"
                            />
                          </svg>
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
                        <svg
                          width="10"
                          height="14"
                          viewBox="0 0 10 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.90625 7.53125C9.1875 7.25 9.1875 6.78125 8.90625 6.5L2.84375 0.40625C2.53125 0.125 2.0625 0.125 1.78125 0.40625L1.0625 1.125C0.78125 1.40625 0.78125 1.875 1.0625 2.1875L5.875 7L1.0625 11.8438C0.78125 12.1562 0.78125 12.625 1.0625 12.9062L1.78125 13.625C2.0625 13.9062 2.53125 13.9062 2.84375 13.625L8.90625 7.53125Z"
                            fill="#BDBDBD"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                )}
              </Pagination>
            )}
          </div>
        </section>
      </div>
      <div id="modal" />
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    blogEntries: PropTypes.array,
    topics: PropTypes.array,
  }).isRequired,
};

export default DataLoader(BlogPage, {
  queryFunc: () => ({
    sanityQuery: `{
      "blogEntries": *[_type  == "blog-post"] | order(date.utc desc) {_id, title, date, content, authors, date, standfirst, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current},
      "topics": *[_type == "topics"] | order(title){_id, title, slug},
    }`,
  }),
  materializeDepth: 1,
});
