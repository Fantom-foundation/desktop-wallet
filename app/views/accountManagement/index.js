import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { clipboard } from 'electron';

import arrowLeftRight from '../../images/icons/arrows-left-right.svg';
import Header from '../../general/header/index';
import fantomIcon from '../../images/icons/fantom_Icon.png';

import UserAccount from './userAccounts/index';
import QRCodeIcon from '../../general/qr/index';
import Store from '../../store/userInfoStore/index';
import TransactionCard from './transactionCard/index';
import UserAccountDetail from './userAccountDetail/index';

export default class AccountManagement extends React.Component {

    copyToClipboard(copyText) {
        clipboard.writeText(copyText);
    }

    handleUserSettings() {
        const { handleUserSettings } = this.props;
        if (handleUserSettings) {
            handleUserSettings();
        }
    }
    
    render() {
        const { identiconsId, name, address, balance, transactionData, handleSendFunds, handleSelectedAccount } = this.props;

        let transactionLength = 0;
        if (transactionData) {
            transactionLength = transactionData.length;
        }
        return (
            <div>
                <Header handleUserSettings={this.handleUserSettings.bind(this)} accountIcon={identiconsId} />
                <section style={{ padding: '118px 0' }}>
                    <Container className="bg-white">
                        <Row className="bg-primary py-1 account-management-header">
                            <Col md={5} className="col text-white pl-4 text-uppercase">Account Management</Col>
                            <Col className="col text-white text-uppercase" onClick={() => handleSendFunds()}>
                                <img src={arrowLeftRight} className="mr-1" alt='Transfer fund' /> Transfer</Col>
                        </Row>
                        <Row >
                            <Col className="px-5 py-4">
                                <Row className="bg-gray ">

                                    <UserAccountDetail
                                        identiconsId={identiconsId}
                                        name={name}
                                        address={address}
                                        balance={balance}
                                        transactionLength={transactionLength}
                                        copyToClipboard={this.copyToClipboard.bind(this)} />

                                    <QRCodeIcon
                                        className='text-right gray-column large qr'
                                        address={address}
                                        icon={fantomIcon}
                                        text='FANTOM'
                                    />
                                    
                                </Row>
                                <TransactionCard transactionData={transactionData} />
                                {Store.size > 1 && <UserAccount
                                    address={address}
                                    handleSelectedAccount={handleSelectedAccount}
                                    copyToClipboard={this.copyToClipboard.bind(this)} />}
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}