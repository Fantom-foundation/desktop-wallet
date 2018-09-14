import * as Actions from './action';

const KeyReducer = (state = { masterKey: '', publicKey: '', privateKey: '', mnemonic: '' }, action) => {
    console.log('action for set value of keys : ', action);
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
