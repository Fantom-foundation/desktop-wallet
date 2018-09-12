import React, { Component } from 'react';
import { Button, Alert, Modal, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Web3 from 'web3';

import successCheck from '../../images/icons/icon-success.svg';
import smallLogo from '../../images/Logo/small-logo.svg';
import logo from '../../images/Logo/fantom-black-logo.png';
import CheckSend from './checkSend/index';

export default class SendFunds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            accountType: 'Fantom Wallet',
            ftmAmount: '',
            usdAmount: '',
            optionalMessage: '',
            networkFees: 0.000226,
            totalFees: 0.402926,
            isCheckSend: false,
        }
    }

    setAddress(e) {
        const address = e.target.value.trim();
        this.setState({
            address,
        })
    }

    setAccountType(e) {
        const accountType = e.target.value.trim();
        this.setState({
            accountType,
        })
    }

    setFTMAmount(e) {
        const ftmAmount = e.target.value.trim();
        this.setState({
            ftmAmount,
        })
    }

    setUSDAmount(e) {
        const usdAmount = e.target.value.trim();
        this.setState({
            usdAmount,
        })
    }

    setMessage(e) {
        const optionalMessage = e.target.value;
        this.setState({
            optionalMessage,
        })
    }

    handleCheckSend() {
        this.handleSendMoney()
    }

    handleGoBack() {
        this.setState({
            isCheckSend: false
        })
    }

    /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to CheckSend screen if all fields are filled.
   */
    handleSendMoney() {
        const { address, ftmAmount, } = this.state;

        let message = '';
        if (address === '') {
            message = 'Please enter address.';
        } else if (!Web3.utils.isAddress(address)) {
            message = 'Please enter valid address.';
        } else if (ftmAmount === '') {
            message = 'Please enter valid amount';
        }

        if (message !== '') {
            return;
        }
        this.setState({
            isCheckSend: true
        })
    }

    render() {
        const { address, accountType, ftmAmount, usdAmount, optionalMessage, networkFees, totalFees, isCheckSend } = this.state;
        const { publicKey, privateKey } = this.props;
        return (
            <Modal isOpen={true} className={`${!isCheckSend ? 'send-funds' : 'send-check'}`} >
                <ModalBody className="p-4">
                    <div >
                        {!isCheckSend ? <div>
                            <h2 className="text-primary title" style={{ marginBottom: '20px' }}><span><strong>Send Funds</strong></span></h2>
                            {/* <p>To Address</p>
                <input 
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={this.setAddress.bind(this)} /> */}


                            <FormGroup>
                                <Label for="to-address"><strong>To Address</strong></Label>
                                <div className="success-check success">  {/* add or remove --- success --- class */}
                                    <Input type="text" id="to-address" placeholder="Enter Address" value={address} onChange={this.setAddress.bind(this)}/>
                                    <img src={successCheck} alt={successCheck}/>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="withdraw-from"><strong>Withdraw from</strong></Label>
                                <div className="withdraw-holder">
                                    <Input type="text" id="withdraw-from" placeholder="Fantom Wallet" disabled value={accountType} onChange={this.setAccountType.bind(this)}/>
                                    <span className="value-1">0.58273450 FTM</span>
                                    <span className="value-2">≈$144.68</span>
                                </div>
                            </FormGroup>

                            {/* <p>Withdraw from</p>
                <input 
                type='text'
                placeholder='Fantom Wallet'
                value={accountType}
                disabled
                onChange={this.setAccountType.bind(this)} /> */}




                            <Row className="change">
                                <Col>
                                    <FormGroup>
                                        <Label for="Amount"><strong>Amount</strong></Label>
                                        <div className="input-holder">
                                            <Input type="text" id="to-address" className="text-right" value={ftmAmount} onChange={this.setFTMAmount.bind(this)}/>
                                            <span>FTM</span>
                                            <img src={smallLogo} className="logo" alt={smallLogo}/>
                                        </div>

                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="Amount"><strong>&nbsp;</strong></Label>
                                        <div className="input-holder">
                                            <Input type="text" id="Amount" className="text-right" value={usdAmount} onChange={this.setUSDAmount.bind(this)}/>
                                            <span>USD</span></div>
                                    </FormGroup>

                                </Col>

                            </Row>
                            {/* <p>Amount</p>
                <input 
                type='text'
                value={ftmAmount}
                onChange={this.setFTMAmount.bind(this)} />

                <input 
                type='text'
                value={usdAmount}
                onChange={this.setUSDAmount.bind(this)} /> */}

                            <p className="note m-0"><strong>Note</strong></p>
                            <FormGroup className="mb-1">
                                <Input type="textarea" name="text" id="exampleText" placeholder="Optional Message" value={optionalMessage} onChange={this.setMessage.bind(this)}/>
                            </FormGroup>



                            <div className="result mt-2" style={{ maxWidth: '175px', margin: 'auto', marginRight: 0 }}>
                                <Row className="m-0">
                                    <Col className="p-0"><p><strong>Network fee</strong></p></Col>
                                    <Col className="text-right p-0"><p>{networkFees} USD <span>($0.06)</span></p></Col>
                                </Row>
                                <Row className="m-0">
                                    <Col className="p-0"><p><strong>Total</strong></p></Col>
                                    <Col className="text-right p-0"><p>{totalFees} USD <span>($100.06)</span></p></Col>
                                </Row>

                            </div>

                            <center><Button color="primary" className="text-uppercase" onClick={this.handleCheckSend.bind(this)}>Continue</Button></center>

                            <span className="pointer" style={{
                                position: 'absolute', top: '20px', right: '42px', fontSize: '25px',
                                lineHeight: '55%',
                                fontWeight: 100,
                                fontFamily: 'Robotos',
                                color: '#8D9BAE'
                            }} onClick={() => this.props.onClose()} >&times;</span>
                        </div>
                         :



                            <div>
                                <img src={logo} height="25.05" />

                                <CheckSend
                                    handleGoBack={this.handleGoBack.bind(this)}
                                    address={address}
                                    amount={ftmAmount}
                                    coin={accountType}
                                    memo={optionalMessage || 'none'}
                                    fees={networkFees}
                                    publicKey={publicKey}
                                    privateKey={privateKey}
                                // reload={ this.reload.bind(this)}
                                />
                            </div>
                        }
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

