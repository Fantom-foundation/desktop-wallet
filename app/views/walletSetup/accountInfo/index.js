import React, { Component } from 'react';
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import ReactToPrint from 'react-to-print';
import AccountFooter from '../../../general/footer/account-footer';
import AccountInfoCard from '../../../containers/HomePage/account-info';

class AccountInfo extends Component {
    render() {
        console.log(`account info mnemonic=${this.props.mnemonic} address=${this.props.address}`);
        return (
            <Row>
                <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                    <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                        <Row className="mx-0">
                            <Col style={{ paddingTop: '46px', paddingBottom: '46px', paddingLeft: '66px', paddingRight: '69px' }}>

                                <AccountInfoCard 
                                mnemonic={this.props.mnemonic}  
                                address={this.props.address} 
                                identiconsId={this.props.identiconsId} 
                                ref={el => (this.accountInfoRef = el)}/>
                                <Row className="my-3 ">
                                    <Col className="text-center">
                                        <ReactToPrint
                                    trigger={() => <Button color="primary">Print Phrase</Button>}
                                    content={() => this.accountInfoRef}
                                  />
                                        {/* <Button color="primary">Print Phrase</Button> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text mb-3 black-text">Please back up the recovery phase now. Make sure to keep it private and secure, it allows full and unlimited access to your account.</p>

                                        <p className="text small mb-0 black-text">Type ‘’ I have written down the phrase’’  below to confirm it is backed up.</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {/* <FooterButtons /> */}
                    </div>
                    <AccountFooter />
                </Col>
            </Row>
        );
    }
}

export default AccountInfo;