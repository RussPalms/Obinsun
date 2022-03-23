import { createStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

export const store = createStore(rootReducer);
// export default store;

export default function _() {
  const div = document.createElement('div');
  return div;
}
