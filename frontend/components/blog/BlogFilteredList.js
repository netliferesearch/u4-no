import React, { useState, useEffect } from 'react';
import { BlogEntriesFilter } from './BlogEntriesFilter';
import { CloseButton } from '../general/buttons';
import { clearBlogFilter, updateBlogPageNum } from '../../helpers/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationComponent } from '../general/PaginationComponent';
import { Post, POST_TYPE } from '../general/post/Post';

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

export const BlogFilteredList = props => {
  const { blogEntries = [], topics = [] } = props;
  const dispatch = useDispatch();
  const blogPageNum = useSelector(state => state.blogPageNum);
  const blogFilters = useSelector(state => state.blogFilters);
  const [filtersResults, setFiltersResults] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);
  const limit = blogFilters.length === 0 ? 12 : 9;
  const offset = (blogPageNum - 1) * limit;
  const total = filtersResults.length ? filtersResults.length : currentResults.length * limit;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.search.indexOf('blogPageNum') === -1) {
        dispatch(updateBlogPageNum(1));
      }
    }
  }, []);

  const handleRemove = index => {
    dispatch(clearBlogFilter(index));
    dispatch(updateBlogPageNum(1));
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
  return (
    <div>
      <div
        className={`c-blog-index__filters ${
          blogFilters.length ? 'c-blog-index__filters--active' : ''
        }`}
      >
        <BlogEntriesFilter topics={topics} filters={blogFilters} />
        <div className="c-blog-index__filters-set">
          {blogFilters.map((f, index) => (
            <div className="c-blog-index__tag-container" key={index}>
              <div className="c-blog-index__tag">{f.title}</div>
              <CloseButton onClick={() => handleRemove(index)} text="Remove all" modifier="ter" />
            </div>
          ))}
        </div>
        {blogFilters.length ? (
          <div className="c-blog-index__filters-info">
            <h5>{`${filtersResults.length} Blog articles`}</h5>
          </div>
        ) : (
          <div className="c-blog-index__filters--none">
            <h5>{`${blogEntries.length} Blog articles`}</h5>
          </div>
        )}
      </div>

      {currentResults ? (
        <div className="c-blog-index__list">
          {currentResults.map((post, index) => (
            <Post post={post} type={POST_TYPE.BLOG} slug={post.slug} key={index} />
          ))}
        </div>
      ) : null}
      <PaginationComponent total={total} limit={limit} currentPage={blogPageNum} />
    </div>
  );
};
