import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import uniq from 'lodash/uniq';
import queryString from 'query-string';

// for when we need to reflect some redux state in the url
const replaceWindowHash = (hashValue) => {
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
  const newQueryString = queryString.stringify(Object.assign(currentParams, nullifyFalsyValues(queryParams)));
  // If it's a modern browser we can manipulate url without triggering reloading
  // source: https://stackoverflow.com/a/19279428
  if (history.replaceState) {
    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?${newQueryString}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  } else {
    location.search = newQueryString;
  }
};

const defaultState = {
  readingProgressId: '',
  isArticleMenuOpen: false,
  isPublicationDrawerOpen: false, // read the whole-button is now deactivated
  // for the times when we need to remember where we last were on the page.
  storedScrollPosition: false,
  showLoadingScreen: false,
  searchSorting: 'relevance',
  searchFilters: [],
};

export const actionTypes = {
  UPDATE_READING_PROGRESS: 'UPDATE_READING_PROGRESS',
  TOGGLE_PUBLICATION_DRAWER: 'TOGGLE_PUBLICATION_DRAWER',
  TOGGLE_ARTICLE_MENU: 'TOGGLE_ARTICLE_MENU',
  TOGGLE_LOADING_SCREEN: 'TOGGLE_LOADING_SCREEN',
  SEARCH_CLEAR_ALL_FILTERS: 'SEARCH_CLEAR_ALL_FILTERS',
  SEARCH_ADD_FILTER: 'SEARCH_ADD_FILTER',
  SEARCH_REMOVE_FILTER: 'SEARCH_REMOVE_FILTER',
  SEARCH_UPDATE_SORT: 'SEARCH_UPDATE_SORT',
  SCROLL_POSITION_SAVE: 'SCROLL_POSITION_SAVE',
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
    case actionTypes.TOGGLE_PUBLICATION_DRAWER:
      return Object.assign({}, state, { isPublicationDrawerOpen: !state.isPublicationDrawerOpen });
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

export const togglePublicationDrawer = () => dispatch =>
  dispatch({ type: actionTypes.TOGGLE_PUBLICATION_DRAWER });

export const updateSearchSorting = sortName => dispatch =>
  dispatch({ type: actionTypes.SEARCH_UPDATE_SORT, sortName });

/**
 * @param {String} searchFilter name of filter to add
 */
export const addSearchFilter = searchFilter => dispatch =>
  dispatch({ type: actionTypes.SEARCH_ADD_FILTER, searchFilter });

export const removeSearchFilter = searchFilter => dispatch =>
  dispatch({ type: actionTypes.SEARCH_REMOVE_FILTER, searchFilter });

export const saveScrollPosition = scrollPosition => dispatch =>
  dispatch({ type: actionTypes.SCROLL_POSITION_SAVE, scrollPosition });

export const initStore = (initialState = defaultState, options) => {
  const { query = {} } = options;
  const { filters = '', sort = '' } = query;
  let state = initialState;
  // if there are active filters in the url query params we need to split
  // and add them to the state.
  if (filters) {
    state = Object.assign(initialState, {
      searchFilters: filters.split(','),
    });
  }
  // if there is an active query param sort configured we let it override
  // the default sorting in state
  if (sort) {
    state = Object.assign(initialState, {
      searchSorting: sort,
    });
  }
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};
