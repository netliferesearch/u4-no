import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import uniq from 'lodash/uniq';
import remove from 'lodash/remove';

const replaceWindowHash = (hashValue) => {
  if (!window) {
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
      return Object.assign({}, state, {
        searchFilters: uniq(state.searchFilters.concat(action.searchFilter)),
      });
    case actionTypes.SEARCH_REMOVE_FILTER:
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
 * [addSearchFilter description]
 * @param {Object} searchFilter 'string name of filter'
 */
export const addSearchFilter = searchFilter => dispatch =>
  dispatch({ type: actionTypes.SEARCH_ADD_FILTER, searchFilter });

export const removeSearchFilter = searchFilter => dispatch =>
  dispatch({ type: actionTypes.SEARCH_REMOVE_FILTER, searchFilter });

export const initStore = (initialState = defaultState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
