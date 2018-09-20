import React, { Component } from 'react';
import { Button, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Web3 from 'web3';
import Loader from '../../general/loader/index';

import successCheck from '../../images/icons/icon-success.svg';
import smallLogo from '../../images/Logo/small-logo.svg';
import logo from '../../images/Logo/fantom-black-logo.png';
import CheckSend from './checkSend/index';
import AccountList from './accountList';
import Store from '../../store/userInfoStore/index';
import { getPrivateKeyOfAddress } from '../../KeystoreManager/index';

export default class SendFunds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            accountType: this.props.accountName,
            ftmAmount: '',
            usdAmount: '',
            optionalMessage: '',
            totalFees: 0.402926,
            isCheckSend: false,
            isValidAddress: false,
            accountStore: [],
            password: '',
            privateKey: '',
            publicKey: '',
            loading: false,
            verificationError: '',
        }
    }

    componentWillReceiveProps(nextProps){
        const { storeKeys,  publicKey, accountName  } = nextProps;
        const userAccountStore = Store.store;
        const accountDetailList = [];
        for(const key of storeKeys){ 
            accountDetailList.push(userAccountStore[key]);
        }
        this.setState({
            accountStore: accountDetailList,
            publicKey,
            accountType: accountName,
        });
    }

    componentDidMount(){
        const { storeKeys,  publicKey, accountName  } = this.props;
        const userAccountStore = Store.store;
        const accountDetailList = [];
        for(const key of storeKeys){ 
            accountDetailList.push(userAccountStore[key]);
        }
        this.setState({
            accountStore: accountDetailList,
            publicKey,
            accountType: accountName,
        });
    }

    setAddress(e) {
        const address = e.target.value.trim();
        this.setState({
            address,
        })
        this.addressVerification(address);
    }

    setAccountType(e) {
        const { accountStore } = this.state;
        const accountType = e.target.value;
        const length = accountStore.length;
        let publicKey = '';
        for(let account = 0;  account < length; account++){
            if(accountStore[account].name === accountType){
                publicKey = accountStore[account].address;
            }
          }
        this.setState({
            accountType,
            publicKey,
        });
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

    setPassword(e) {
        const password = e.target.value.trim();
        this.setState({
            password,
            verificationError: '',
        })
    }

    handleCheckSend() {
        const { password , publicKey, loading } = this.state;
        if(loading){
            return null;
        }
        const isValidDetail = this.handleSendMoney();
        if(isValidDetail){
              this.getPrivateKeyOfAddress(publicKey, password);
        }
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
        const { address, ftmAmount, password } = this.state;

        let message = '';
        if (address === '') {
            message = 'Please enter address.';
        } else if (!Web3.utils.isAddress(address)) {
            message = 'Please enter valid address.';
        } else if (ftmAmount === '') {
            message = 'Please enter valid amount';
        } else if (password === ''){
            message = 'Please enter password to continue!!';
        }

        if (message !== '') {
            return false;
        }
       
        
        this.setState({
            loading: true,
        })
        return true;
    }


    /**
     * addressVerification() : To check address entered is valid address or not, if valid address then display green tick.
     */
    addressVerification(address) {
        let message = '';
        if (address === '') {
            message = 'Please enter address.';
        } else if (!Web3.utils.isAddress(address)) {
            message = 'Please enter valid address.';
        }
        if (message === '') {
            this.setState({
                isValidAddress: true,
            });
        } else {
            this.setState({
                isValidAddress: false,
            });
        }
    }

    handleModalClose() {
        const { isSendFund, onClose } = this.props;
        if (isSendFund && onClose) {
            onClose();
        }
    }

    getPrivateKeyOfAddress(publicKey, password){
        getPrivateKeyOfAddress(publicKey, password).then((res) => {
            const hexPrivateKey = res.result;
            this.setState({
                privateKey: hexPrivateKey,
            })
            if(hexPrivateKey !== '') {
                this.setState({
                    verificationError: '',
                    isCheckSend: true,
                    loading: false,
                })
             }
        }).catch((err) => {
            this.setState({
                verificationError: 'Verification Failed.',
                privateKey: '',
                loading: false,
            })
        })
    }

    renderLoader(){
        const { loading } = this.state;
        if(loading){
            return <div className='loader-holder'>
            <Loader
                sizeUnit="px"
                size={25}
                color="#000"
                loading={loading}
              /></div>
        }
        return null;
    }

    renderVerificationError(){
        const { verificationError } = this.state;
        if(verificationError !== ''){
            return <div className='loader-holder'><span style={{ color: 'red' }}>{verificationError}</span></div>
        }
        return null;
    }

    render() {    
        const { address, accountType, ftmAmount, usdAmount, optionalMessage,
              totalFees, isCheckSend, isValidAddress, accountStore, publicKey, privateKey, password, loading } = this.state;

             let continueBtnColor = 'primary';
           if(loading){

             continueBtnColor = 'secondary';
           }
            
        return (
            <div >
                <div className="modal fade show" role="dialog" tabIndex="-1" style={{ display: 'block' }} >
                    <div className="modal-dialog send-funds" role="document">
                        <div className="modal-content">
                            <ModalBody className="p-4">
                                <div >
                                    {!isCheckSend ?
                                        <div>
                                            <h2 className="text-primary title" style={{ marginBottom: '20px' }}><span><strong>Send Funds</strong></span></h2>
                                            <FormGroup>
                                                <Label for="to-address"><strong>To Address</strong></Label>
                                                <div className={`success-check ${isValidAddress ? 'success' : ''}`}>  {/* add or remove --- success --- class  */}
                                                    <Input type="text" id="to-address" placeholder="Enter Address" value={address} onChange={this.setAddress.bind(this)} />
                                                    <img src={successCheck} alt={successCheck} />
                                                </div>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="withdraw-from"><strong>Withdraw from</strong></Label>
                                                <div className="withdraw-holder">
                                                    <AccountList accountType={accountType} accountStore={accountStore} setAccountType={this.setAccountType.bind(this)} />
                                                    <span className="value-1">0.58273450 FTM</span>
                                                </div>
                                            </FormGroup>
                                            <Row className="change">
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="Amount"><strong>Amount</strong></Label>
                                                        <div className="input-holder">
                                                            <Input type="text" id="to-address" className="text-right" value={ftmAmount} onChange={this.setFTMAmount.bind(this)} />
                                                            <span>FTM</span>
                                                            <img src={smallLogo} className="logo" alt={smallLogo} />
                                                        </div>

                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="Amount"><strong>&nbsp;</strong></Label>
                                                        <div className="input-holder">
                                                            <Input type="text" id="Amount" className="text-right" value={usdAmount} onChange={this.setUSDAmount.bind(this)} />
                                                            <span>USD</span></div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <FormGroup>
                                                <Label for="to-address"><strong>Enter password : </strong></Label>
                                                <div className="success-check">  {/* add or remove --- success --- class  */}
                                                    <Input type="password" id="to-password" placeholder="Enter password" value={password} onChange={this.setPassword.bind(this)} />
                                                    {/* <img src={successCheck} alt={successCheck} /> */}
                                                </div>
                                            </FormGroup>

                                            <Label for="OptionalMessage" ><strong>Note</strong></Label>
                                            <FormGroup className="mb-1">
                                                <Input type="textarea" name="text" id="exampleText" placeholder="Optional Message" value={optionalMessage} onChange={this.setMessage.bind(this)} />
                                            </FormGroup>

                                            <div className="result mt-2" style={{ maxWidth: '235px', margin: 'auto', marginRight: 0 }}>
                                                <Row className="m-0">
                                                    <Col className="p-0"><p><strong>Total</strong></p></Col>
                                                    <Col className="text-right p-0"><p>{totalFees} USD <span>($100.06)</span></p></Col>
                                                </Row>
                                            </div>

                                            <center><Button color={`${continueBtnColor}`} className="text-uppercase" onClick={this.handleCheckSend.bind(this)}>Continue</Button></center>

                                            <span aria-hidden
                                                className="pointer" style={{
                                                position: 'absolute', top: '20px', right: '42px', fontSize: '25px',
                                                lineHeight: '55%',
                                                fontWeight: 100,
                                                fontFamily: 'Robotos',
                                                color: '#8D9BAE'
                                            }} onClick={this.handleModalClose.bind(this)} >&times;</span>
                                            {this.renderVerificationError()}
                                            {this.renderLoader()}
                                        </div>
                                        :
                                        <div>
                                            <img src={logo} height="25.05" alt={logo}/>
                                            <CheckSend
                                                handleGoBack={this.handleGoBack.bind(this)}
                                                address={address}
                                                amount={ftmAmount}
                                                memo={optionalMessage || 'none'}
                                                publicKey={publicKey}
                                                privateKey={privateKey}
                                                handleModalClose={this.handleModalClose.bind(this)}
                                                refreshWalletDetail={this.props.refreshWalletDetail}
                                            />
                                        </div>
                                    }
                                </div>
                            </ModalBody>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" role="dialog" aria-hidden
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, display: 'block', bottom: 0, zIndex: -1 }}
                        onClick={this.handleModalClose.bind(this)}/>
                </div>
            </div>
        )
    }
}

