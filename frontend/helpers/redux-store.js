import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

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

const exampleInitialState = {
  readingProgressId: '',
  isArticleMenuOpen: false,
  showLoadingScreen: false,
};

export const actionTypes = {
  UPDATE_READING_PROGRESS: 'UPDATE_READING_PROGRESS',
  TOGGLE_ARTICLE_MENU: 'TOGGLE_ARTICLE_MENU',
  TOGGLE_LOADING_SCREEN: 'TOGGLE_LOADING_SCREEN',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
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

export const initStore = (initialState = exampleInitialState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
