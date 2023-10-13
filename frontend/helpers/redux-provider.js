'use client';

import { Provider } from 'react-redux';
import { initStore } from './redux-store';

export const StoreProvider = ({ children }) => {
  const store = initStore();
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}