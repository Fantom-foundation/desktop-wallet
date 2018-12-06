import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import moment from 'moment';

import DropDown from '../../../general/dropdown/transaction-filter-dropdown';
import received from '../../../images/transaction-list-filter/received.svg';
import send from '../../../images/transaction-list-filter/send.svg';
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
    const { transactionData } = this.props;
    const { txType } = this.state;
    let allTransaction = (
      <center>
        <p className="r-title text-gray mb-2">
          (Your recent sent transactions will be displayed here)
        </p>
      </center>
    );

    // const transactionData = this.getTransactionsData();

    if (
      transactionData &&
      transactionData.length &&
      transactionData.length > 0
    ) {
      allTransaction = transactionData.map(data => (
        <div className="card bg-dark-light">
          <Row className="">
            <Col className="date-col">
              <div
                style={{
                  backgroundImage: `url(${
                    txType === RECEIVED_TX ? received : send
                  })`
                }}
              >
                <p>{moment(data.time).date()}</p>
                <p>{moment(data.time).format('MMM')}</p>
              </div>
            </Col>
            <Col className="acc-no-col">
              <div className="">
                <p>
                  <span>TX#</span> {data.hash}
                </p>
                <p>
                  <span>To:</span>{' '}
                  {txType === RECEIVED_TX ? data.from : data.to}
                </p>
              </div>
            </Col>
            <Col className="time-col">
              <p>{moment(data.time).fromNow()}</p>
            </Col>
            <Col className="btn-col">
              <Button color={`${txType === RECEIVED_TX ? 'green' : 'red'}`}>
                {data.amount} <span>FTM</span>
              </Button>
            </Col>
          </Row>
        </div>
      ));
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
    const isReceived = false;
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
            <Col>
              <div className=" card bg-dark-light">
                <Row className="">
                  <Col className="date-col">
                    <div
                      style={{
                        backgroundImage: `url(${isReceived ? received : send})`
                      }}
                    >
                      <p>
                        {moment(
                          'Wed Dec 05 2018 13:09:47 GMT+0530 (IST)'
                        ).date()}{' '}
                      </p>
                      <p>
                        {moment(
                          'Wed Dec 05 2018 13:09:47 GMT+0530 (IST)'
                        ).format('MMM')}
                      </p>
                    </div>
                  </Col>
                  <Col className="acc-no-col">
                    <div className="">
                      <p>
                        <span>TX#</span> 075868435934588gjtdrfh8tu4rut
                      </p>
                      <p>
                        <span>To:</span> 075868435934588gjtdrfh8tu4rut
                      </p>
                    </div>
                  </Col>
                  <Col className="time-col">
                    {/* <p>23 mins 41 secs ago</p> */}
                    <p>
                      {moment(
                        'Wed Dec 05 2018 13:09:47 GMT+0530 (IST)'
                      ).fromNow()}
                    </p>
                  </Col>
                  <Col className="btn-col">
                    <Button color="red">
                      2.10000000 <span>FTM</span>
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className=" card bg-dark-light">
                <Row className="">
                  <Col className="date-col">
                    <div
                      style={{
                        backgroundImage: `url(${!isReceived ? received : send})`
                      }}
                    >
                      <p>
                        {moment(
                          'Wed Dec 05 2018 13:09:47 GMT+0530 (IST)'
                        ).date()}{' '}
                      </p>
                      <p>
                        {moment(
                          'Wed Dec 05 2018 13:09:47 GMT+0530 (IST)'
                        ).format('MMM')}
                      </p>
                    </div>
                  </Col>
                  <Col className="acc-no-col">
                    <div className="">
                      <p>
                        <span>TX#</span> 075868435934588gjtdrfh8tu4rut
                      </p>
                      <p>
                        <span>To:</span> 075868435934588gjtdrfh8tu4rut
                      </p>
                    </div>
                  </Col>
                  <Col className="time-col">
                    {/* <p>23 mins 41 secs ago</p> */}
                    <p>
                      {moment(
                        'Wed Dec 05 2018 13:09:47 GMT+0530 (IST)'
                      ).fromNow()}
                    </p>
                  </Col>
                  <Col className="btn-col">
                    <Button color="red">
                      2.10000000 <span>FTM</span>
                    </Button>
                  </Col>
                </Row>
              </div>
              {this.renderTransactions()}
            </Col>
          </Row>
        </div>
      </Col>
    );
  }
}

export default TransactionCard;
