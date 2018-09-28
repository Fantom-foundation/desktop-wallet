import React, { Component } from 'react';
import { Row, Col, } from 'reactstrap';
import { connect } from 'react-redux';

import Identicons from '../../../general/identicons/identicons';
import copyImage from '../../../images/icons/copy.svg';
import { addCommasToNumber } from '../../../general/util/index';

/**
 * UserAccountDetail: This component is meant for rendering details of account selected from accounts list.
 * this card contains following info:-
 * identiconsId: Icon for that account,
 * name: Name of account,
 * address: Public key address for that account,
 * transactionLength: Count of sent transactions.
 * 
 * Functions for each account are:-
 * copyToClipboard: To Copy the address text to clipboard.
 */
class UserAccountDetail extends Component {
    render() {  
        const { identiconsId, name, address, copyToClipboard, transactionCount } = this.props;
        let { transactionLength, balance } = this.props;
        if(balance){
            balance = addCommasToNumber(balance);
        }
        if(!transactionLength){
            transactionLength = transactionCount;
        }

        return (
            <Col lg={8} className="gray-column large">
                <div className="person-info large">
                    <span className="person-basic-info">
                        <div className="mt-2 mr-3 theme-blue-shadow d-inline-block align-top" style={{ cursor: 'pointer', width: '40px', height: '45px', overflow: 'hidden' }}>
                            <Identicons id={identiconsId} className="person-image theme-blue-shadow" width={40} size={3} />
                        </div>
                        <div className="d-inline-block align-top block">
                            <h2 className="person-name">{name}</h2>
                            <div className="person-copy-info">
                                <div className="info-description-box pl-0">
                                    <span aria-hidden className="mr-3" onClick={() => copyToClipboard(address)} style={{cursor: 'pointer'}}>
                                        <img src={copyImage} className="copy mr-3" alt='Copy Text'/>
                                    </span>
                                    <span className="">{address}</span>
                                </div>
                            </div>

                        </div>
                    </span>
                    <Row className=" mt-3 mt-lg-0">
                        <Col className="blank-88 hide-at-991"/>
                        <Col>
                            <div className="">
                                <p className="text large text-gray mb-0"/>
                                <p className="text  text-gray " style={{fontSize: '15px', marginBottom: '6px'}}>Ledger {name}</p>
                                <p className="text  text-gray mb-5" style={{fontSize: '15px'}}>{transactionLength} Outgoing transactions</p>
                            </div>
                            <div className="bg-white ftm-block theme-blue-shadow text-center py-2 m-auto ml-lg-0 px-4 inline-block">
                                {/* <h3 className="text-right pr-4"><span>(1,000\ = 1.00002312FTM)</span></h3> */}
                                <h2 className="text-center" style={{position: 'relative', transform: 'translateY(50%)'}}><span><strong>{balance ? `${balance}` : '0'} <span className="medium-text">{balance === '-' ? '' : 'FTM'}</span></strong></span></h2>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        )
    }
}

const mapStateToProps = (state) => ({
    transactionCount: state.transactionStoreReducer.transactionCount,
});


export default connect(mapStateToProps, null)(UserAccountDetail);