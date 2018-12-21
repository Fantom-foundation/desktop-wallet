import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import moment from 'moment';

import DropDown from '../../../general/dropdown/transaction-filter-dropdown';
import received from '../../../images/transaction-list-filter/received.svg';
import send from '../../../images/transaction-list-filter/send.svg';
import { ALL_TX, SENT_TX, RECEIVED_TX } from '../../../constants/index';

import TxHashTooltip from './txHashTooltip';

/**
 * TransactionCard: This component is meant for rendering transactions for selected account.
 * Only transaction that are sent from that account are displayed in list.Otherwise no transaction is displayed.
 *
 */

class TransactionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowTransaction: false,
      txType: ALL_TX
    };
    this.filterTransaction = this.filterTransaction.bind(this);
  }

  filterTransaction(txType) {
    this.setState({
      txType
    });
  }

  /**
   * renderTransactions() :  A function to render transaction cards based on transaction data fetched from file on system.
   */
  renderTransactions() {
    const { transactionData, address, copyToClipboard } = this.props;
    const { txType } = this.state;

    const allTransaction = (
      <p className="m-msg text-white  text-center mb-0">
        (Your recent transactions will be displayed here)
      </p>
    );
    const transactionsHistory = [];

    // const transactionData = this.getTransactionsData();

    if (
      transactionData &&
      transactionData.length &&
      transactionData.length > 0
    ) {
      for (let i = 0; i < transactionData.length; i += 1) {
        const data = transactionData[i];
        const date = moment(data.time);
        const isReceived =
          transactionData[i].to === address &&
          (txType === RECEIVED_TX || txType === ALL_TX);
        const isSend =
          transactionData[i].from === address &&
          (txType === SENT_TX || txType === ALL_TX);

        if (isReceived || isSend || txType === ALL_TX) {
          transactionsHistory.push(
            <div key={`${i}_${date}`} className="card bg-dark-light">
              <Row className="">
                <Col className="date-col">
                  <div
                    style={{
                      backgroundImage: `url(${isReceived ? received : send})`
                    }}
                  >
                    <p>{date.date()}</p>
                    <p>{date.format('MMM')}</p>
                  </div>
                </Col>
                <Col className="acc-no-col">
                  <div className="">
                    <TxHashTooltip
                      index={i}
                      hash={data.hash}
                      copyToClipboard={copyToClipboard}
                    />

                    <p>
                      <span>{isReceived ? 'From:' : 'To:'}</span>{' '}
                      {isReceived ? data.from : data.to}
                    </p>
                  </div>
                </Col>
                <Col className="time-col">
                  <p>{date.fromNow()}</p>
                </Col>
                <Col className="btn-col">
                  <Button color={`${isReceived ? 'green' : 'red'}`}>
                    {data.amount} <span>FTM</span>
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }
      }
    }
    if (transactionsHistory.length) {
      return transactionsHistory;
    }

    return allTransaction;
  }

  handleShowTransaction() {
    const { isShowTransaction } = this.state;
    this.setState({
      isShowTransaction: !isShowTransaction
    });
  }

  render() {
    const { txType } = this.state;

    return (
      <Col md={12} lg={8}>
        <div className="bg-dark-light">
          <div className="add-wallet">
            <h2 className="title ">
              <span>Transactions</span>
            </h2>
            <DropDown
              txType={txType}
              filterTransaction={this.filterTransaction}
            />
          </div>
        </div>

        <div id="acc-cards">{this.renderTransactions()}</div>
      </Col>
    );
  }
}

export default TransactionCard;
