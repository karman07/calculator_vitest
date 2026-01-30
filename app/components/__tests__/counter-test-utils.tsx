import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../store/counterSlice';
import Counter from '../Counter';

export const renderWithRedux = (initialState = { counter: { value: 0 } }) => {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
    preloadedState: initialState,
  });

  return {
    ...render(
      <Provider store={store}>
        <Counter />
      </Provider>
    ),
    store,
  };
};