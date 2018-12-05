import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import moment from 'moment';

import DropDown from '../../../general/dropdown/transaction-filter-dropdown';

/**
 * TransactionCard: This component is meant for rendering transactions for selected account.
 * Only transaction that are sent from that account are displayed in list.Otherwise no transaction is displayed.
 *
 */

class TransactionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowTransaction: false
    };
  }

  /**
   * renderTransactions() :  A function to render transaction cards based on transaction data fetched from file on system.
   */
  renderTransactions() {
    const { transactionData } = this.props;
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
              <div>
                <p>{moment(data.time).date()}</p> {/* Day */}
                <p>{moment(data.time).format('MMM')}</p>
                {/* month */}
              </div>
            </Col>
            <Col className="acc-no-col">
              <div className="">
                <p>
                  <span>TX#</span> {data.hash}
                </p>
                <p>
                  <span>To:</span> {data.to}
                </p>
              </div>
            </Col>
            <Col className="time-col">
              <p>{moment(data.time).fromNow()}</p>
            </Col>
            <Col className="btn-col">
              <Button color="green">
                {data.amount} <span>FTM</span>
              </Button>
            </Col>
          </Row>
        </div>

        // <Row key={index} className="bg-gray mt-2">
        //   <Col className="gray-column transactions-details small">
        //     <Row>
        //       <Col className="blank-88 hide-at-991" />
        //       <Col className="">
        //         <Row>
        //           <Col>
        //             <h4 className="text-ellipsis  w-208">
        //               <span>
        //                 TX# <a href="#">{data.hash}</a>
        //               </span>
        //             </h4>
        //           </Col>
        //           <Col>
        //             <h4 className=" text-right text-primary">
        //               <span>{moment(data.time).fromNow()}</span>
        //             </h4>
        //           </Col>
        //         </Row>
        //         <Row>
        //           <Col className="blank-184">
        //             <h4 className="text-gray text-ellipsis  w-148">
        //               <span>
        //                 From <a href="#">{data.from}</a>
        //               </span>
        //             </h4>
        //           </Col>
        //           <Col>
        //             <h4 className="text-gray text-ellipsis  w-185">
        //               <span>
        //                 to <a href="#">{data.to}</a>
        //               </span>
        //             </h4>
        //           </Col>
        //         </Row>
        //         <Row>
        //           <Col>
        //             <h4 className="text-gray">
        //               <span>
        //                 Amount {data.amount}{' '}
        //                 <a href="#">
        //                   <strong>Fantom</strong>
        //                 </a>
        //               </span>
        //             </h4>
        //           </Col>
        //         </Row>
        //       </Col>
        //     </Row>
        //   </Col>
        // </Row>
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
    // const { isShowTransaction } = this.state;
    // let transition ='scaleY(1)';
    // if(isShowTransaction){
    //     transition = 'scaleY(-1)';
    // }
    console.log('new Date() : ', new Date());

    const date = moment(new Date());

    if (date.isValid()) {
      const day = date.date();
      console.log(`day ${day}`);

      const month = date.format('MMM');
      console.log(`month ${month}`);
    } else {
      console.log('Date is not valid! ');
    }
    return (
      <Col md={7} lg={8}>
        <div className="bg-dark-light">
          <div className="add-wallet">
            <h2 className="title ">
              <span>Transactions</span>
            </h2>
            {/* <Button> */}
            <DropDown />
            {/* </Button> */}
          </div>
        </div>
        <div id="acc-cards" className="">
          <Row>
            <Col>
              <div className=" card bg-dark-light">
                <Row className="">
                  <Col className="date-col">
                    <div>
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
