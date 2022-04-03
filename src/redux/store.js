import reducer from './reducer';
import {createStore } from 'redux';

// This connects the reducer to the store
export default function configureStore() {
  const store = createStore(reducer);

  return store;
}
