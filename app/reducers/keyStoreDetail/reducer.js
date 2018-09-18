import * as Actions from './action';

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
