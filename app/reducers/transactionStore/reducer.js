import * as Actions from './action';

const TransactionStoreReducer = (state = { transactionCount: 0 }, action) => {
  switch (action.type) {
    case Actions.TRANSACTION_COUNT:
      return Object.assign({}, state, {
        transactionCount: action.transactionCount,
      });
    default:
      return state;
  }
};

export default TransactionStoreReducer;
