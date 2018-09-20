import React, { Component } from 'react';
import  { Col, Row } from 'reactstrap';

import UserAccountDetail from '../userAccountDetail/index';
import QRCodeIcon from '../../../general/qr/index';
import TransactionCard from '../transactionCard/index';

class UserAccountsDetailCard extends Component {
    
    render(){
        const { publicKey, identiconsId, name, balance, transactionLength, copyToClipboard, transactionData } = this.props;
        return(
                        <Row >
                            <Col className="px-5 py-4">
                                <Row className="bg-gray ">

                                    <UserAccountDetail
                                        identiconsId={identiconsId}
                                        name={name}
                                        address={publicKey}
                                        balance={balance}
                                        transactionLength={transactionLength}
                                        copyToClipboard={copyToClipboard} />
                                    <Col className="text-right gray-column large qr">
                                        <QRCodeIcon
                                            address={publicKey}
                                            text='FANTOM'
                                        />
                                    </Col>
                                    
                                </Row>
                                <TransactionCard transactionData={transactionData} />
                            </Col>
                        </Row>
            )
    }
}

export default UserAccountsDetailCard;