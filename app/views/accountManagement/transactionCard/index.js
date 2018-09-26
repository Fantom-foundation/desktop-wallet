import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import downArrowIcon from '../../../images/icons/downArrowBlack.svg';
import TransactionStore from '../../../store/transactionStore';
import * as TransactionStoreAction from '../../../reducers/transactionStore/action';

class TransactionCard extends Component {
    constructor(props){
        super(props);

        this.state= {
            isShowTransaction: false,
        }
    }

    getTransactionsData() {
        let outGoingTransCount = 0;
      const key = 'Transactions';
      const newObj = TransactionStore.get(key);
      const objArr = newObj || [];
      const arrToRet = [];
      const { address } = this.props;
      for (const transaction of objArr) {
        if (transaction.to && transaction.from && (transaction.to === address)) {
            if(transaction.from === address){
                outGoingTransCount =+ 1;
            }
             
          arrToRet.push(transaction);
        }
      }
      this.props.storeTransactionCount(outGoingTransCount);

      return arrToRet;
    }

    renderTransactions() {
        // const { transactionData } = this.props;
        let allTransaction =<center><p className="r-title text-gray mb-2">You have no transactions to display.</p></center> 
        
        const transactionData = this.getTransactionsData();
        
        if (transactionData && transactionData.length && transactionData.length > 0) {
            allTransaction = transactionData.map((data, index) => (
                <Row key={index} className="bg-gray mt-2">
                    <Col className="gray-column transactions-details small">
                        <Row>
                            <Col className="blank-88 hide-at-991"/>
                            <Col className="">
                                <Row>
                                    <Col ><h4 className="text-ellipsis  w-208"><span>TX# <a href="#">{data.hash}</a></span></h4></Col>
                                    <Col><h4 className=" text-right text-primary"><span>{moment(data.time).fromNow()}</span></h4></Col>
                                </Row>
                                <Row>
                                    <Col className="blank-184"><h4 className="text-gray text-ellipsis  w-148"><span >From <a href="#">{data.from}</a></span></h4></Col>
                                    <Col ><h4 className="text-gray text-ellipsis  w-185"><span>to <a href="#">{data.to}</a></span></h4></Col>
                                </Row>
                                <Row>
                                    <Col><h4 className="text-gray"><span>Amount {data.amount} <a href="#"><strong>Fantom</strong></a></span></h4></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ));
        }
        return allTransaction;
    }

    handleShowTransaction(){
        const { isShowTransaction } = this.state;
        this.setState({
            isShowTransaction: !isShowTransaction,
        })
    }

    render() {
        const { isShowTransaction } = this.state;
        let transition ='scaleY(1)';
        if(isShowTransaction){
            transition = 'scaleY(-1)';
        }
        return (
            <div>
                <Row className="bg-gray mt-4">
                    <Col className="pl-5 py-2">
                        <h2 className="r-title text-gray mb-0"><span>Sent Transactions</span></h2>
                    </Col>
                    {/* <Col className="pr-5 py-2 text-right" onClick={this.handleShowTransaction.bind(this)}>
                    <img src={downArrowIcon} alt="Down Arrow " style={{ cursor: 'pointer', height: '16.6px', transition: '1s all', transform: `${transition}` }} />
                    </Col> */}
                </Row>
                {this.renderTransactions()}
            </div>

        )
    }
}


const mapStateToProps = (state) => ({
  });
  
  const mapDispatchToProps = (dispatch) => ({
    storeTransactionCount: ( transactionCount ) => {
        dispatch({ type: TransactionStoreAction.TRANSACTION_COUNT, transactionCount });
    },
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(TransactionCard);
