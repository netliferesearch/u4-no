import React, { useState, useEffect } from 'react';
import { BlogEntriesFilter } from './BlogEntriesFilter';
import { CloseButton } from '../general/buttons';
import { clearBlogFilter, updateBlogFilters, updateBlogPageNum } from '../../helpers/redux-store';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  const { blogFilters, updateBlogFilters, blogPageNum, blogEntries = [], topics = [] } = props;
  const dispatch = useDispatch();
  const [filtersResults, setFiltersResults] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const limit = blogFilters.length === 0 ? 12 : 9;
  const maxPagesListed = 5;
  const offset = (blogPageNum - 1) * limit;
  const total = filtersResults.length ? filtersResults.length : currentResults.length * limit;
  let d = currentResults.length < limit ? 1 : currentResults.length;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.search.indexOf('blogPageNum') === -1) {
        dispatch(updateBlogPageNum(1));
        //updateBlogPageNum(1);
      }
    }
  }, []);

  const handleRemove = index => {
    dispatch(clearBlogFilter(index));
    dispatch(updateBlogPageNum(1));
    //updateBlogPageNum(1);
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
        <BlogEntriesFilter topics={topics} setFilters={updateBlogFilters} filters={blogFilters} />
        <div className="c-blog-index__filters-set">
          {/* {console.log(blogFilters)} */}
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
      {/* {console.log(blogPageNum)} */}
      {/* {filtersResults && filtersResults.length > 0 && ( */}
      <PaginationComponent
        className="c-blog-index__paginator"
        total={total}
        limit={limit}
        pageCount={pageCount}
        currentPage={blogPageNum}
      />
      {/* )} */}
    </div>
  );
};

const mapStateToProps = ({ blogFilters = [], blogPageNum = 1 }) => ({ blogFilters, blogPageNum });

const mapDispatchToProps = dispatch => ({
  updateBlogFilters: bindActionCreators(updateBlogFilters, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogFilteredList);
