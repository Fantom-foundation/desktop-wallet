import * as Actions from './action';

/**
 * TransactionStoreReducer: A reducer for holding state of wallet transaction detail,  of address whose transactions are fetched from file on system.
 */
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
