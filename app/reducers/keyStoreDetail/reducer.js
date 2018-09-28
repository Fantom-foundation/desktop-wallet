import * as Actions from './action';

/**
 * KeyStoreDetailReducer: A reducer for holding state of wallet account detail,  of all valid keys fetched from file on system.
 */
const KeyStoreDetailReducer = (state = { keyStoreDetail: '' }, action) => {
  switch (action.type) {
    case Actions.UPDATE_KEY_STORE_DETAIL:
      return Object.assign({}, state, {
        keyStoreDetail: action.keyStoreDetail,
      });
    default:
      return state;
  }
};
export default KeyStoreDetailReducer;
