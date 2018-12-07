import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import moment from 'moment';

import HttpDataProvider from './httpProvider';
import DropDown from '../../../general/dropdown/transaction-filter-dropdown';
// import received from '../../../images/transaction-list-filter/received.svg';
// import send from '../../../images/transaction-list-filter/send.svg';
import { ALL_TX, SENT_TX, RECEIVED_TX } from '../../../constants/index';

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
      txType: ALL_TX,
      transactionData: []
    };
    this.filterTransaction = this.filterTransaction.bind(this);
    this.fetchTransactionList();
  }

  filterTransaction(txType) {
    this.setState({
      txType
    });
  }

  fetchTransactionList() {
    const { address } = this.props;
    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
        {
          transactions(from: "${address}", to: "${address}") {
            pageInfo {
              hasNextPage
            }
            edges {
              cursor
              node {
                hash
                from
                to
                block
                value
              }
            }
          }
        }`
    })
      .then(
        res => {
          console.log(res, 'graphql');
          if (res && res.data) {
            this.formatTransactionList(res.data);
          }
          return null;
        },
        () => {
          console.log('1');
        }
      )
      .catch(err => {
        console.log(err, 'err in graphql');
      });
  }

  formatTransactionList(data) {
    if (
      data &&
      data.transactions &&
      data.transactions.edges &&
      data.transactions.edges.length
    ) {
      const edgesArray = data.transactions.edges;
      const transactionArr = [];
      for (const edge of edgesArray) {
        if (edge && edge.node) {
          transactionArr.push(edge.node);
        }
      }
      this.setState({ transactionData: transactionArr });
    }
  }

  /**
   * renderTransactions() :  A function to render transaction cards based on transaction data fetched from file on system.
   */
  renderTransactions() {
    const { address } = this.props;
    const { transactionData, txType } = this.state;

    const allTransaction = (
      <center>
        <p className="r-title text-gray mb-2">
          (Your recent transactions will be displayed here)
        </p>
      </center>
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
        const hash = moment(data.hash);
        const isReceived =
          transactionData[i].to === address &&
          (txType === RECEIVED_TX || txType === ALL_TX);
        const isSend =
          transactionData[i].from === address &&
          (txType === SENT_TX || txType === ALL_TX);

        if (isReceived || isSend || txType === ALL_TX) {
          transactionsHistory.push(
            <div key={`${i}_${hash}`} className="card bg-dark-light">
              <Row className="">
                {/* <Col className="date-col">
                  <div
                    style={{
                      backgroundImage: `url(${isReceived ? received : send})`
                    }}
                  >
                    <p>{date.date()}</p>
                    <p>{date.format('MMM')}</p>
                  </div>
                </Col> */}
                <Col className="acc-no-col">
                  <div className="">
                    <p>
                      <span>TX#</span> {data.hash}
                    </p>
                    <p>
                      <span>{isReceived ? 'From:' : 'To:'}</span>{' '}
                      {isReceived ? data.from : data.to}
                    </p>
                  </div>
                </Col>
                {/* <Col className="time-col">
                  <p>{date.fromNow()}</p>
                </Col> */}
                <Col className="btn-col">
                  <Button color={`${isReceived ? 'green' : 'red'}`}>
                    {data.value} <span>FTM</span>
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
        <div id="acc-cards" className="">
          <Row>
            <Col>{this.renderTransactions()}</Col>
          </Row>
        </div>
      </Col>
    );
  }
}

export default TransactionCard;
