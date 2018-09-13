import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import copyImage from '../../../images/icons/copy.svg';
import Identicons from '../../../general/identicons/identicons';

class AccountCard extends Component {

    handleSelectedAccount() {
        const { accountInfo, handleSelectedAccount } = this.props;
        if (handleSelectedAccount) {
            handleSelectedAccount(accountInfo.address);
        }
    }

    copyToClipboard() {
        const { accountInfo, copyToClipboard } = this.props;
        if (copyToClipboard) {
            copyToClipboard(accountInfo.address)
        }
    }

    render() {
        const { accountInfo } = this.props;
        return (
            <Col xs={12} md={6} className="mb-3 accounts accounts-column" >
                <div className="h-100 bg-gray py-4">
                    <Row >
                        <Col className="account-logo px-0 pl-3" onClick={this.handleSelectedAccount.bind(this)}>
                            <div className="theme-blue-shadow d-inline-block align-top" style={{ width: '40px', height: '45px', overflow: 'hidden' }}>
                                <Identicons id={accountInfo.accountIcon} className="person-image theme-blue-shadow" width={40} size={3} />
                            </div>
                        </Col>
                        <Col className="pl-0">
                            <h2 className="black-text"><span >{accountInfo.name}</span></h2>
                            <p aria-hidden className="account-number text text-primary large mb-0 text-ellipsis" onClick={this.copyToClipboard.bind(this)}>
                                <img src={copyImage} alt='copy text' /> {accountInfo.address}</p>
                        </Col>
                    </Row>
                </div>
            </Col>
        )
    }
}

export default AccountCard;