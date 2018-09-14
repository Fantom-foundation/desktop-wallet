import * as Actions from './action';

const CreateAccountReducer = (state = { accountName: '', password: '', passwordHint: '', accountIcon: '' }, action) => {
    console.log('action for create acoount value : ', action);
  switch (action.type) {
    case Actions.CREATE_NEW_ACCOUNT:
      return Object.assign({}, state, {
        accountName: action.accountName,
        password: action.password,
        passwordHint: action.passwordHint,
        accountIcon: action.accountIcon,
      });
    default:
      return state;
  }
};

export default CreateAccountReducer;
