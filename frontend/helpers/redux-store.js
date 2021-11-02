/* eslint-disable */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import uniq from 'lodash/uniq';
import queryString from 'query-string';
import Router from 'next/router';

// for when we need to reflect some redux state in the url
const replaceWindowHash = hashValue => {
  if (typeof window === 'undefined') {
    // do nothing
  } else if (history.replaceState) {
    // update hash without page jumps,
    // courtesy of https://stackoverflow.com/a/14690177
    const newHash = hashValue ? `#${hashValue}` : window.location.pathname;
    history.replaceState(null, null, newHash);
  } else {
    const newHash = hashValue ? `#${hashValue}` : '';
    window.location.hash = newHash;
  }
};

// for when we need to reflect some redux state in the url
const addQueryParams = queryParams => {
  if (typeof window === 'undefined') {
    return; // do nothing
  }
  // loops through object valued and sets any falsy values to undefined
  // when query-string stringifies undefined values they'll be removed from
  // the resulting query string. So, if there are no filters= it should not
  // show up as a query parameter.
  const nullifyFalsyValues = obj =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = value || undefined;
      return acc;
    }, {});

  const currentParams = queryString.parse(location.search);
  const newQueryString = queryString.stringify(
    Object.assign(currentParams, nullifyFalsyValues(queryParams))
  );
  const newUrl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }?${newQueryString}`;
  Router.replace(newUrl, undefined, { scroll: false });
};

const updateFilterQueryParams = (filters = []) => {
  addQueryParams({
    searchPageNum: 1,
    filters: uniq(filters)
      .map(name => name.replace(/,/g, '|'))
      .join(),
  });
};

const defaultState = {
  readingProgressId: '',
  isArticleMenuOpen: false,
  // for the times when we need to remember where we last were on the page.
  storedScrollPosition: false,
  showLoadingScreen: false,
  searchSorting: 'relevance',
  searchLoading: false,
  searchFilters: [],
  searchResultsVisible: false,
  searchPageNum: 1,
  searchResults: {},
  defaultSearchAggs: [],
};

export const actionTypes = {
  UPDATE_READING_PROGRESS: 'UPDATE_READING_PROGRESS',
  TOGGLE_ARTICLE_MENU: 'TOGGLE_ARTICLE_MENU',
  TOGGLE_LOADING_SCREEN: 'TOGGLE_LOADING_SCREEN',
  SEARCH_CLEAR_ALL_FILTERS: 'SEARCH_CLEAR_ALL_FILTERS',
  SEARCH_ADD_FILTER: 'SEARCH_ADD_FILTER',
  SEARCH_REMOVE_FILTER: 'SEARCH_REMOVE_FILTER',
  SEARCH_UPDATE_SORT: 'SEARCH_UPDATE_SORT',
  SEARCH_REPLACE_FILTERS: 'SEARCH_REPLACE_FILTERS',
  SEARCH_UPDATE_PAGE_NUM: 'SEARCH_UPDATE_PAGE_NUM',
  SEARCH_UPDATE_RESULTS: 'SEARCH_UPDATE_RESULTS',
  SEARCH_START: 'SEARCH_START',
  SCROLL_POSITION_SAVE: 'SCROLL_POSITION_SAVE',
  SEARCH_UPDATE_DEFAULT_AGGS: 'SEARCH_UPDATE_DEFAULT_AGGS',
  BLOG_UPDATE_FILTERS: 'BLOG_UPDATE_FILTERS',
  BLOG_CLEAR_FILTERS: 'BLOG_CLEAR_FILTERS',
  BLOG_CLEAR_FILTER: 'BLOG_CLEAR_FILTER',
  BLOG_UPDATE_PAGE_NUM: 'BLOG_UPDATE_PAGE_NUM',
  LANG_UPDATE_FILTERS: 'LANG_UPDATE_FILTERS',
  LANG_CLEAR_FILTERS: 'LANG_CLEAR_FILTERS',
  CLEAR_SEARCH_STATE: 'CLEAR_SEARCH_STATE',
};

// REDUCERS
export const reducer = (state = defaultState, action) => {
  console.log('reducer', action, state);
  switch (action.type) {
    case actionTypes.BLOG_CLEAR_FILTER:
      return { ...state, blogFilters: state.blogFilters.filter((f, i) => i !== action.index) };
    case actionTypes.SEARCH_UPDATE_SORT:
      addQueryParams({
        sort: action.sortName,
      });
      return Object.assign({}, state, { searchSorting: action.sortName });
    case actionTypes.SEARCH_ADD_FILTER:
      updateFilterQueryParams(state.searchFilters.concat(action.searchFilter));
      return Object.assign({}, state, {
        searchFilters: uniq(state.searchFilters.concat(action.searchFilter)),
        searchPageNum: 1,
      });
    case actionTypes.SEARCH_REMOVE_FILTER:
      updateFilterQueryParams(state.searchFilters.filter(name => name !== action.searchFilter));
      return Object.assign({}, state, {
        searchFilters: state.searchFilters.filter(name => name !== action.searchFilter),
        searchPageNum: 1,
      });
    case actionTypes.SEARCH_REPLACE_FILTERS:
      updateFilterQueryParams(action.searchFilters);
      return Object.assign({}, state, {
        searchFilters: uniq(action.searchFilters),
        searchPageNum: 1,
      });
    case actionTypes.SEARCH_UPDATE_PAGE_NUM:
      if (state.searchPageNum !== action.searchPageNum) {
        addQueryParams({
          searchPageNum: `${action.searchPageNum}`,
          filters: uniq(state.searchFilters)
            .map(name => name.replace(/,/g, '|'))
            .join(),
        });
        return { ...state, searchPageNum: action.searchPageNum };
      }
      return state;
    case actionTypes.SEARCH_CLEAR_ALL_FILTERS:
      addQueryParams({ filters: false });
      return Object.assign({}, state, {
        searchFilters: [],
      });
    case actionTypes.CLEAR_SEARCH_STATE:
      return { ...state, searchResultsVisible: action.value };
    case actionTypes.SEARCH_UPDATE_DEFAULT_AGGS:
      return Object.assign({}, state, {
        defaultSearchAggs: action.defaultSearchAggs,
      });
    case actionTypes.START_SEARCH:
      return { ...state, searchLoading: true };
    case actionTypes.SEARCH_UPDATE_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults,
        searchLoading: false,
        searchResultsVisible: true,
      };
    case actionTypes.TOGGLE_ARTICLE_MENU:
      return Object.assign({}, state, { isArticleMenuOpen: !state.isArticleMenuOpen });
    case actionTypes.TOGGLE_LOADING_SCREEN:
      return Object.assign({}, state, { showLoadingScreen: !state.showLoadingScreen });
    case actionTypes.UPDATE_READING_PROGRESS:
      if (state.isArticleMenuOpen) {
        return Object.assign({}, state);
      }
      replaceWindowHash(action.readingProgressId);
      return Object.assign({}, state, { readingProgressId: action.readingProgressId });
    case actionTypes.SCROLL_POSITION_SAVE:
      return Object.assign({}, state, { storedScrollPosition: action.scrollPosition });

    case actionTypes.BLOG_UPDATE_FILTERS:
      return Object.assign({}, state, {
        blogFilters: uniq(action.blogFilters),
      });

    case actionTypes.BLOG_CLEAR_FILTERS:
      return Object.assign({}, state, {
        blogFilters: [],
      });

    case actionTypes.BLOG_UPDATE_PAGE_NUM:
      if (state.blogPageNum !== action.blogPageNum) {
        addQueryParams({
          blogPageNum: `${action.blogPageNum}`,
        });
        return { ...state, blogPageNum: action.blogPageNum };
      }
      return state;

    case actionTypes.LANG_UPDATE_FILTERS:
      return Object.assign({}, state, {
        langFilters: uniq(action.langFilters),
      });

    case actionTypes.LANG_CLEAR_FILTERS:
      return Object.assign({}, state, {
        langFilters: [],
      });

    default:
      return state;
  }
};

// ACTIONS
export const updateReadingProgress = readingProgressId => dispatch =>
  dispatch({ type: actionTypes.UPDATE_READING_PROGRESS, readingProgressId });

export const toggleArticleMenu = () => dispatch =>
  dispatch({ type: actionTypes.TOGGLE_ARTICLE_MENU });

export const toggleLoadingScreen = () => dispatch =>
  dispatch({ type: actionTypes.TOGGLE_LOADING_SCREEN });

export const actionSetSearchVisibility = value => ({ type: actionTypes.CLEAR_SEARCH_STATE, value });

export const updateSearchSorting = sortName => {
  return { type: actionTypes.SEARCH_UPDATE_SORT, sortName };
};

export const addSearchFilter = searchFilter => {
  return { type: actionTypes.SEARCH_ADD_FILTER, searchFilter };
};

export const removeSearchFilter = searchFilter => {
  return { type: actionTypes.SEARCH_REMOVE_FILTER, searchFilter };
};

export const replaceSearchFilters = (searchFilters = []) => {
  return { type: actionTypes.SEARCH_REPLACE_FILTERS, searchFilters };
};

export const clearAllSearchFilters = () => dispatch =>
  dispatch({ type: actionTypes.SEARCH_CLEAR_ALL_FILTERS });

export const updateSearchPageNum = searchPageNum => {
  return { type: actionTypes.SEARCH_UPDATE_PAGE_NUM, searchPageNum };
};

export const updateSearchAggregations = defaultSearchAggs => {
  return { type: actionTypes.SEARCH_UPDATE_DEFAULT_AGGS, defaultSearchAggs };
};

export const saveScrollPosition = scrollPosition => dispatch =>
  dispatch({ type: actionTypes.SCROLL_POSITION_SAVE, scrollPosition });

export const updateBlogFilters = (blogFilters = []) => dispatch =>
  dispatch({ type: actionTypes.BLOG_UPDATE_FILTERS, blogFilters });

export const clearBlogFilters = () => dispatch =>
  dispatch({ type: actionTypes.BLOG_CLEAR_FILTERS });

export const clearBlogFilter = index => ({ type: actionTypes.BLOG_CLEAR_FILTER, index });

export const actionStartSearch = () => ({ type: actionTypes.SEARCH_START });

export const updateBlogPageNum = blogPageNum => dispatch => {
  return dispatch({ type: actionTypes.BLOG_UPDATE_PAGE_NUM, blogPageNum });
};

export const updateLangFilters = (langFilters = []) => dispatch =>
  dispatch({ type: actionTypes.LANG_UPDATE_FILTERS, langFilters });

export const clearLangFilters = () => dispatch =>
  dispatch({ type: actionTypes.LANG_CLEAR_FILTERS });

export const initStore = (initialState = defaultState, options = {}) => {
  const { query = {} } = options;
  const { searchPageNum } = query;
  let state = initialState;

  if (searchPageNum) {
    state = {
      ...state,
      searchPageNum: parseInt(searchPageNum, 10),
    };
  }

  return createStore(reducer, state, applyMiddleware(thunkMiddleware));
};
