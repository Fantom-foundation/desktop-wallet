import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';

import copyImage from '../../../images/icons/copy.svg';
import  Identicons  from '../../../general/identicons/identicons';

class AccountCard extends Component {

    handleSelectedAccount(){
        const {accountInfo} = this.props;

        if(this.props.handleSelectedAccount){
            this.props.handleSelectedAccount(accountInfo.address);
        }
    }
    copyToClipboard(){
        const {accountInfo} = this.props;
        if(this.props.copyToClipboard){
            this.props.copyToClipboard(accountInfo.address)
        }
    }

    render(){
        const {accountInfo} = this.props;
        return(
            <Col className="bg-gray mr-2 mb-3 accounts accounts-column" >
                        <Row className="py-4" >
                          <Col className="account-logo px-0" onClick={this.handleSelectedAccount.bind(this)}>
                            <Identicons id={accountInfo.accountIcon} 
                            className="person-image theme-blue-shadow" width={40} size={3} />
                          </Col>
                          <Col className="pl-0">
                          <h2 className="black-text"><span >{accountInfo.name}</span></h2>
                          <p className="account-number text text-primary large mb-0 text-ellipsis" onClick={this.copyToClipboard.bind(this)}>
                            <img src={copyImage} /> {accountInfo.address}</p>
                          </Col>
                        </Row>
                      </Col>
        )
    }
}

export default AccountCard;