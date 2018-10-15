import * as Actions from './action';

/**
 * KeyReducer: A reducer for holding state of values for keys and mnemonic created while wallet setup.
 */
const KeyReducer = (state = { masterKey: '', publicKey: '', privateKey: '', mnemonic: '' }, action) => {
  switch (action.type) {
    case Actions.MASTER_KEY:
      return Object.assign({}, state, {
        masterKey: action.key,
      });
    case Actions.PUBLIC_KEY:
      return Object.assign({}, state, {
        publicKey: action.key,
      });
    case Actions.MASTER_PUBLIC_PRIVATE_KEY:
      return Object.assign({}, state, {
        publicKey: action.publicKey,
        masterKey: action.masterKey,
        privateKey: action.privateKey,
      });
    case Actions.MNEMONIC_CODE:
      return Object.assign({}, state, {
        mnemonic: action.mnemonic,
      });
    default:
      return state;
  }
};

export default KeyReducer;
