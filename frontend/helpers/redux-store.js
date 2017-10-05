import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const replaceWindowHash = (hashValue) => {
  if (!window) {
    // do nothing
  } else if (history.pushState) {
    // update hash without page jumps,
    // courtesy of https://stackoverflow.com/a/14690177
    history.pushState(null, null, `#${hashValue}`);
  } else {
    window.location.hash = `#${hashValue}`;
  }
};

const exampleInitialState = {
  readingProgressId: '1.-introduction',
  isArticleMenuOpen: false,
};

export const actionTypes = {
  UPDATE_READING_PROGRESS: 'UPDATE_READING_PROGRESS',
  TOGGLE_ARTICLE_MENU: 'TOGGLE_ARTICLE_MENU',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_ARTICLE_MENU:
      return Object.assign({}, state, { isArticleMenuOpen: !state.isArticleMenuOpen });
    case actionTypes.UPDATE_READING_PROGRESS:
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

export const initStore = (initialState = exampleInitialState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
