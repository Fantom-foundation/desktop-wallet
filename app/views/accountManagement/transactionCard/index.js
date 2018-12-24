import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Web3 from 'web3';
import DropDown from '../../../general/dropdown/transaction-filter-dropdown';
import { ALL_TX, SENT_TX, RECEIVED_TX } from '../../../constants/index';

import TxHashTooltip from './txHashTooltip';
import HttpDataProvider from '../../../store/httpProvider';
import Loader from '../../../general/loader';
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
      isLoading: false,
      transactions: []
    };
    this.filterTransaction = this.filterTransaction.bind(this);
  }

  componentDidMount() {
    const { address } = this.props;
    if (address) {
      this.setState({
        isLoading: true
      });
      this.fetchTransactionList(address);

      this.txnInterval = setInterval(() => {
        this.fetchTransactionList(address);
      }, 4000);
    }
  }

  filterTransaction(txType) {
    this.setState({
      txType
    });
  }

  // eslint-disable-next-line react/sort-comp
  fetchTransactionList(address) {
    // eslint-disable-next-line no-param-reassign
    HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
      query: `
      {
        transactions(first: 100,from: "${address}", to: "${address}", byDirection: "desc") {
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
          if (res && res.data && res.data.data) {
            this.formatTransactionList(res.data.data);
          }
          this.setState({
            isLoading: false
          });
          return null;
        },
        () => {
          console.log('1');
        }
      )
      .catch(err => {
        this.setState({
          isLoading: false
        });
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
      // eslint-disable-next-line no-restricted-syntax
      for (const edge of edgesArray) {
        if (edge && edge.node) {
          transactionArr.push(edge.node);
        }
      }
      this.setState({ transactions: transactionArr });
    }
  }

  /**
   * renderTransactions() :  A function to render transaction cards based on transaction data fetched from file on system.
   */
  renderTransactions() {
    const { address, copyToClipboard } = this.props;
    const { txType, transactions } = this.state;
    const transactionData = transactions;

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

        const isReceived =
          transactionData[i].to === address &&
          (txType === RECEIVED_TX || txType === ALL_TX);
        const isSend =
          transactionData[i].from === address &&
          (txType === SENT_TX || txType === ALL_TX);

        if (isReceived || isSend || txType === ALL_TX) {
          transactionsHistory.push(
            <div key={`${i}`} className="card bg-dark-light">
              <Row className="">
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

                <Col className="btn-col">
                  <Button color={`${isReceived ? 'green' : 'red'}`}>
                    {data.value
                      ? Web3.utils.fromWei(`${data.value}`, 'ether')
                      : '--'}
                    <span>FTM</span>
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

  renderLoader() {
    const { isLoading } = this.state;
    return (
      <div className="loader">
        <div className="loader-holder loader-center-align">
          <Loader sizeUnit="px" size={25} color="white" loading={isLoading} />
        </div>
      </div>
    );
  }

  render() {
    const { txType, isLoading } = this.state;

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

        <div id="acc-cards">
          {isLoading ? this.renderLoader() : this.renderTransactions()}
        </div>
      </Col>
    );
  }
}

export default TransactionCard;
