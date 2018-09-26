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

            <div className='h-100' style={{position: 'relative'}}>

                <div aria-hidden className='account-card-field-overlay' onClick={this.handleSelectedAccount.bind(this)}/>
                <div className="h-100 bg-gray py-4">
                    <Row style={{cursor: 'pointer'}}>
                        <Col className="account-logo px-0 pl-3" >
                            <div className="theme-blue-shadow d-inline-block align-top" 
                            style={{ cursor: 'pointer',width: '40px', height: '45px', overflow: 'hidden' }}>
                                <Identicons id={accountInfo.accountIcon} className="person-image theme-blue-shadow" width={40} size={3} />
                            </div>
                        </Col>
                        <Col className="pl-lg-0 pl-md-3">
                            <h2 aria-hidden className="black-text" ><span >{accountInfo.name}</span></h2>
                            <p aria-hidden className="account-number text text-primary large mb-0 text-ellipsis" style={{cursor: 'pointer'}} >
                                <img aria-hidden src={copyImage} 
                                onClick={this.copyToClipboard.bind(this)} 
                                alt='copy text' style={{zIndex: 2, position: 'relative' }}/> {' '}
                                <span aria-hidden >{accountInfo.address}</span></p>
                        </Col>
                    </Row>
                </div>
              </div>


            </Col>
        )
    }
}

export default AccountCard;