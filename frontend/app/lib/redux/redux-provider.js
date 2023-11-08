'use client';

import { Provider } from 'react-redux';
import { initStore } from '@/app/lib/redux/redux-store';

const store = initStore();

export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}