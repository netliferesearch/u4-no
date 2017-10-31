import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import uniq from 'lodash/uniq';
import queryString from 'query-string';

// for when we need to reflect some redux state in the url
const replaceWindowHash = (hashValue) => {
  if (typeof window === 'undefined') {
    // do nothing
  } else if (history.pushState) {
    // update hash without page jumps,
    // courtesy of https://stackoverflow.com/a/14690177
    const newHash = hashValue ? `#${hashValue}` : window.location.pathname;
    history.pushState(null, null, newHash);
  } else {
    const newHash = hashValue ? `#${hashValue}` : '';
    window.location.hash = newHash;
  }
};

// for when we need to reflect some redux state in the url
const addQueryParams = (queryParams) => {
  if (!window) {
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
    Object.assign(currentParams, nullifyFalsyValues(queryParams)),
  );
  // If it's a modern browser we can manipulate url without triggering reloading
  // source: https://stackoverflow.com/a/19279428
  if (history.pushState) {
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location
      .pathname}?${newQueryString}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  } else {
    location.search = newQueryString;
  }
};

const defaultState = {
  readingProgressId: '',
  isArticleMenuOpen: false,
  showLoadingScreen: false,
  searchSorting: 'relevance',
  searchFilters: [],
};

export const actionTypes = {
  UPDATE_READING_PROGRESS: 'UPDATE_READING_PROGRESS',
  TOGGLE_ARTICLE_MENU: 'TOGGLE_ARTICLE_MENU',
  TOGGLE_LOADING_SCREEN: 'TOGGLE_LOADING_SCREEN',
  SEARCH_CLEAR_ALL_FILTERS: 'SEARCH_CLEAR_ALL_FILTERS',
  SEARCH_ADD_FILTER: 'SEARCH_ADD_FILTER',
  SEARCH_REMOVE_FILTER: 'SEARCH_REMOVE_FILTER',
  SEARCH_UPDATE_SORT: 'SEARCH_UPDATE_SORT',
};

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_ADD_FILTER:
      addQueryParams({
        filters: uniq(state.searchFilters.concat(action.searchFilter)).join(),
      });
      return Object.assign({}, state, {
        searchFilters: uniq(state.searchFilters.concat(action.searchFilter)),
      });
    case actionTypes.SEARCH_REMOVE_FILTER:
      addQueryParams({
        filters: state.searchFilters.filter(name => name !== action.searchFilter).join(),
      });
      return Object.assign({}, state, {
        searchFilters: state.searchFilters.filter(name => name !== action.searchFilter),
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

/**
 * @param {String} searchFilter name of filter to add
 */
export const addSearchFilter = searchFilter => dispatch =>
  dispatch({ type: actionTypes.SEARCH_ADD_FILTER, searchFilter });

export const removeSearchFilter = searchFilter => dispatch =>
  dispatch({ type: actionTypes.SEARCH_REMOVE_FILTER, searchFilter });

export const initStore = (initialState = defaultState, options) => {
  const { query = {} } = options;
  const { filters = '' } = query;
  let state = initialState;
  // if there are active filters in the url query params we need to split
  // and add them to the state.
  if (filters) {
    state = Object.assign(initialState, {
      searchFilters: filters.split(','),
    });
  }
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};
