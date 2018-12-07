import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';

import UserAccountDetail from '../userAccountDetail/index';

import TransactionCard from '../transactionCard/index';
import TransactionStore from '../../../store/transactionStore';

/**
 * UserAccountsDetailCard: This component is meant for rendering selected account from list of account shown in account management screen.
 */

class UserAccountsDetailCard extends Component {
  /**
   * getTransactionsData(): To fetch transactions locally saved , from file on system,
   * if the account has transaction list then , transaction list is returned and its count is updated in reducer.
   */

  getTransactionsData() {
    const key = 'Transactions';
    const newObj = TransactionStore.get(key);
    const objArr = newObj || [];
    const arrToRet = [];
    const { publicKey } = this.props;
    for (const transaction of objArr) {
      if (
        (transaction.to &&
          transaction.from &&
          transaction.from === publicKey) ||
        transaction.to === publicKey
      ) {
        arrToRet.push(transaction);
      }
    }

    return arrToRet.reverse();
  }

  render() {
    const {
      publicKey,
      identiconsId,
      name,
      balance,
      // transactionLength,
      copyToClipboard,
      // transactionData,
      onRefresh,
      isLoading,
      onTransferFund,
      isTransferringMoney,
      animateRefreshIcon
    } = this.props;

    // const sentTransactionDetail = this.getTransactionsData();
    const allTransactionDetail = this.getTransactionsData();

    return (
      <div id="account-datails" className="account-datails">
        <section style={{ padding: '30px 0' }}>
          <Container className="bg-dark acc-details-container">
            <Row>
              <UserAccountDetail
                identiconsId={identiconsId}
                name={name}
                address={publicKey}
                balance={balance}
                transactionLength={allTransactionDetail.length}
                copyToClipboard={copyToClipboard}
                isTransferringMoney={isTransferringMoney}
                onRefresh={onRefresh}
                onTransferFund={onTransferFund}
                animateRefreshIcon={animateRefreshIcon}
              />
              <TransactionCard
                isLoading={isLoading}
                // transactionData={transactionData}
                address={publicKey}
                transactionData={allTransactionDetail}
              />
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default UserAccountsDetailCard;
