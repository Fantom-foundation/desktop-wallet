import * as Actions from './action';

/**
 * CreateAccountReducer: A reducer for holding state of values for create account screen of wallet setup.
 */
const CreateAccountReducer = (
  state = { accountName: '', password: '', accountIcon: '' },
  action
) => {
  switch (action.type) {
    case Actions.CREATE_NEW_ACCOUNT:
      return Object.assign({}, state, {
        accountName: action.accountName,
        password: action.password,
        accountIcon: action.accountIcon
      });
    default:
      return state;
  }
};

export default CreateAccountReducer;
