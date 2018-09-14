// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import keyReducer from './keys/reducer';
import createAccountReducer from './createAccount/reducer';

import counter from './counter';

const rootReducer = combineReducers({
  keyReducer,
  createAccountReducer,
  counter,
  router
});

export default rootReducer;
