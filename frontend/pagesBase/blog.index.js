import React, { useState, useEffect } from 'react';
import Pagination from 'react-paginating';
import PropTypes from 'prop-types';
import DataLoader from '../helpers/data-loader';
import { Layout } from '../components/v2';
import dateToString from '../helpers/dateToString';
import { BreadCrumbV2 } from '../components/v2/BreadCrumbV2';
import { BlogEntriesFilter } from '../components/v2/blog/BlogEntriesFilter';

const applyFliters = (filter, elements) => {
  if (filter) {
    let filtered = elements.filter(elements => {
      if (elements.topics) {
        return elements.topics.find(topic => topic.title === filter.title) ? true : false;
      }
    });
    return filtered;
  } else {
    return elements;
  }
};

const BlogPage = ({ data: { blogEntries = [], topics = [] } }) => {
  const [filter, setFilter] = useState(null);
  const [filterResults, setFilterResults] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const limit = 10;
  const maxPagesListed = 5;
  const offset = (currentPage - 1) * limit;
  const total = filterResults.length ? filterResults.length : currentResults.length * limit;
  let d = currentResults.length < limit ? 1 : currentResults.length;

  const handlePageChange = (page, e) => {
    setCurrentPage(page);
  };

  useEffect(
    () => {
      setFilterResults(applyFliters(filter, blogEntries));
      setCurrentPage(1);
    },
    [filter]
  );

  useEffect(
    () => {
      setCurrentResults(filterResults.slice(offset, offset + limit));
    },
    [filterResults, offset]
  );

  useEffect(
    () => {
      setPageCount(
        Math.ceil(filterResults.length / d) > maxPagesListed
          ? maxPagesListed
          : Math.ceil(filterResults.length / d)
      );
    },
    [currentResults, filterResults]
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
          <BreadCrumbV2 title={'Blog'} parentSlug={'/blog'} />
          <div className="o-wrapper-section">
            <h2 className="u-blue-underline u-navy-big-headline">Insights from our blog</h2>
            <p className="c-blog-index__intro">
              Practitioners, policymakers, activists, and academics share insights on how to build a
              sustainable and inclusive future by curbing corruption.
            </p>
            <BlogEntriesFilter topics={topics} setFilter={setFilter} filter={filter} />
          </div>
        </section>
        <section className="o-wrapper">
          <div className="o-wrapper-section">
            {currentResults &&
              currentResults.map((post, index) => (
                <div key={index}>
                  <div className="c-blog-index__item--row">
                    <div className="text">
                      <h6 className="c-blog-index__type">Blog</h6>
                      <a href={`blog/${post.slug}`}>
                        <h3 className="publication-headline">{post.title}</h3>
                      </a>
                      <p className="c-blog-index-item__intro">{post.lead}</p>
                      <p className="c-blog-index__date">
                        {post.date ? dateToString({ start: post.date.utc }) : null}
                      </p>
                      <div className="topics">
                        {post.topics &&
                          post.topics.map((topic, index) => {
                            return (
                              <span className="topic" key={index}>
                                {topic.title}
                              </span>
                            );
                          })}
                      </div>
                    </div>
                    {post.imageUrl ? (
                      <div
                        className="c-blog-index__featured-image"
                        style={{
                          backgroundImage: `url('${
                            post.imageUrl
                          }?w=470&h=470&fit=crop&crop=focalpoint')`,
                        }}
                      />
                    ) : null}
                  </div>
                  <hr className="u-section-underline" />
                </div>
              ))}
            {filterResults && filterResults.length === 0 && filter !== null && (
              <div>Results(0)</div>
            )}
            {filterResults && filterResults.length > 0 && (
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
                          className={`pagination-item text-button ${
                            currentPage <= 1 ? 'disabled' : ''
                          }`}
                          {...getPageItemProps({
                            pageValue: previousPage,
                            onPageChange: handlePageChange,
                          })}
                        >
                          Prev
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
                        className={`pagination-item text-button ${
                          totalPages - 1 >= currentPage ? '' : 'disabled'
                        }`}
                        {...getPageItemProps({
                          pageValue: nextPage,
                          onPageChange: handlePageChange,
                        })}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                )}
              </Pagination>
            )}
          </div>
        </section>
      </div>
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
      "blogEntries": *[_type  == "blog-post"] | order(date.utc desc) {_id, title, date, standfirst, lead, topics[]->{title}, "imageUrl": featuredImage.asset->url, "slug": slug.current},
      "topics": *[_type == "topics"] | order(title){_id, title, slug},
    }`,
  }),
  materializeDepth: 0,
});
