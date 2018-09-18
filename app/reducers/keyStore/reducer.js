import * as Actions from './action';

const KeyStoreReducer = (state = { publicKeyStore: [] }, action) => {
  switch (action.type) {
    case Actions.UPDATE_KEY_STORE:
      return Object.assign({}, state, {
        publicKeyStore: action.publicKeyStore,
      });
    default:
      return state;
  }
};
export default KeyStoreReducer;
