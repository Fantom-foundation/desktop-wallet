// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import keyReducer from './keys/reducer';
import createAccountReducer from './createAccount/reducer';
import keyStoreReducer from './keyStore/reducer';
import keyStoreDetailReducer from './keyStoreDetail/reducer';
import userAccountReducer from './userDetail/reducer';

import counter from './counter';

const rootReducer = combineReducers({
  keyReducer,
  createAccountReducer,
  keyStoreReducer,
  keyStoreDetailReducer,
  userAccountReducer,
  counter,
  router
});

export default rootReducer;
