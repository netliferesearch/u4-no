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
};

export const actionTypes = {
  UPDATE_READING_PROGRESS: 'UPDATE_READING_PROGRESS',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
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

export const initStore = (initialState = exampleInitialState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
