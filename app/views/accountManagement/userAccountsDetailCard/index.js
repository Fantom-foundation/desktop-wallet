import React, { Component } from 'react';
import  { Col, Row } from 'reactstrap';

import UserAccountDetail from '../userAccountDetail/index';
import QRCodeIcon from '../../../general/qr/index';
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
        if (transaction.to && transaction.from && (transaction.from === publicKey)) {             
          arrToRet.push(transaction);
        }
      }

      return arrToRet.reverse();
    }
    
    render(){
        const { publicKey, identiconsId, name, balance, transactionLength, copyToClipboard, transactionData, isLoading } = this.props;

        const sentTransactionDetail = this.getTransactionsData();
        return(
                        <Row >
                            <Col className="px-5 py-4">
                                <Row className="bg-gray ">

                                    <UserAccountDetail
                                        identiconsId={identiconsId}
                                        name={name}
                                        address={publicKey}
                                        balance={balance}
                                        transactionLength={sentTransactionDetail.length}
                                        copyToClipboard={copyToClipboard} />
                                    <Col className="text-right gray-column large qr">
                                        <QRCodeIcon
                                            address={publicKey}
                                            text='FANTOM'
                                        />
                                    </Col>
                                    
                                </Row>
                                <TransactionCard isLoading={isLoading} transactionData={transactionData} address={publicKey} transactionData={sentTransactionDetail}/>
                            </Col>
                        </Row>
            )
    }
}

export default UserAccountsDetailCard;