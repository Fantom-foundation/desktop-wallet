import * as Actions from './action';

const UserAccountReducer = (state = { accountName: '', accountIcon: '', address: '' }, action) => {
  switch (action.type) {
    case Actions.USER_ACCOUNT_DETAIL:
      return Object.assign({}, state, {
        accountName: action.accountName,
        accountIcon: action.accountIcon,
        address: action.address,
      });
    default:
      return state;
  }
};

export default UserAccountReducer;
