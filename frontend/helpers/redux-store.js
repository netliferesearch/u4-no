/* eslint-disable */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import uniq from 'lodash/uniq';
import queryString from 'query-string';
import { Router } from '../routes';

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
  Router.replaceRoute(newUrl);
};

const updateFilterQueryParams = (filters = []) =>
  addQueryParams({
    filters: uniq(filters)
      .map(name => name.replace(/,/g, '|'))
      .join(),
  });

const defaultState = {
  readingProgressId: '',
  isArticleMenuOpen: false,
  // for the times when we need to remember where we last were on the page.
  storedScrollPosition: false,
  showLoadingScreen: false,
  searchSorting: 'relevance',
  searchFilters: [],
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
  SCROLL_POSITION_SAVE: 'SCROLL_POSITION_SAVE',
  SEARCH_UPDATE_DEFAULT_AGGS: 'SEARCH_UPDATE_DEFAULT_AGGS',
};

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_UPDATE_SORT:
      addQueryParams({
        sort: action.sortName,
      });
      return Object.assign({}, state, { searchSorting: action.sortName });
    case actionTypes.SEARCH_ADD_FILTER:
      updateFilterQueryParams(state.searchFilters.concat(action.searchFilter));
      return Object.assign({}, state, {
        searchFilters: uniq(state.searchFilters.concat(action.searchFilter)),
      });
    case actionTypes.SEARCH_REMOVE_FILTER:
      updateFilterQueryParams(state.searchFilters.filter(name => name !== action.searchFilter));
      return Object.assign({}, state, {
        searchFilters: state.searchFilters.filter(name => name !== action.searchFilter),
      });
    case actionTypes.SEARCH_REPLACE_FILTERS:
      updateFilterQueryParams(action.searchFilters);
      return Object.assign({}, state, {
        searchFilters: uniq(action.searchFilters),
      });
    case actionTypes.SEARCH_UPDATE_PAGE_NUM:
      addQueryParams({
        searchPageNum: `${action.searchPageNum}`,
      });
      return { ...state, searchPageNum: action.searchPageNum };
    case actionTypes.SEARCH_CLEAR_ALL_FILTERS:
      addQueryParams({ filters: false });
      return Object.assign({}, state, {
        searchFilters: [],
      });
    case actionTypes.SEARCH_UPDATE_DEFAULT_AGGS:
      return Object.assign({}, state, {
        defaultSearchAggs: action.defaultSearchAggs,
      });
    case actionTypes.SEARCH_UPDATE_RESULTS:
      return Object.assign({}, state, {
        searchResults: action.searchResults,
      });
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

export const updateSearchSorting = sortName => dispatch =>
  dispatch({ type: actionTypes.SEARCH_UPDATE_SORT, sortName });

export const addSearchFilter = searchFilter => dispatch =>
  dispatch({ type: actionTypes.SEARCH_ADD_FILTER, searchFilter });

export const removeSearchFilter = searchFilter => dispatch =>
  dispatch({ type: actionTypes.SEARCH_REMOVE_FILTER, searchFilter });

export const replaceSearchFilters = (searchFilters = []) => dispatch =>
  dispatch({ type: actionTypes.SEARCH_REPLACE_FILTERS, searchFilters });

export const clearAllSearchFilters = () => dispatch =>
  dispatch({ type: actionTypes.SEARCH_CLEAR_ALL_FILTERS });

export const updateSearchPageNum = searchPageNum => dispatch => {
  return dispatch({ type: actionTypes.SEARCH_UPDATE_PAGE_NUM, searchPageNum });
};

export const saveScrollPosition = scrollPosition => dispatch =>
  dispatch({ type: actionTypes.SCROLL_POSITION_SAVE, scrollPosition });

export const initStore = (initialState = defaultState, options) => {
  const { query = {} } = options;
  const { filters = '', sort = '', searchPageNum } = query;
  let state = initialState;

  if (searchPageNum) {
    state = {
      ...state,
      searchPageNum: parseInt(searchPageNum, 10),
    };
  }

  // if there are active filters in the url query params we need to split
  // and add them to the state.
  if (filters) {
    state = Object.assign(state, {
      searchFilters: filters.split(','),
    });
  }
  // if there is an active query param sort configured we let it override
  // the default sorting in state
  if (sort) {
    state = Object.assign(state, {
      searchSorting: sort,
    });
  }
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};
