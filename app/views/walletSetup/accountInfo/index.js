import React, { Component } from 'react';
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import ReactToPrint from 'react-to-print';
import {clipboard} from 'electron';

import QRCodeIcon from '../../../general/qr/index';

import smallLogo from '../../../images/Logo/small-logo.svg';
import smallLogoWhite from '../../../images/Logo/small-logo-white.svg';

import AccountFooter from '../../../general/footer/account-footer';
import AccountInfoCard from './accountInfoCard';
import FooterButtons from '../../../general/footer/footer-buttons';
import AccountDetailPrint from './accountDetailPrint';

class AccountInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmText: '',
            confirmPhrase: 'I have written down the phrase',
            isBackupConfirm: false,
            errorText: '',
        }
    }

    onNext(){
     const {confirmText, confirmPhrase } = this.state;
     if(confirmText === confirmPhrase){
        this.setState({
            isBackupConfirm: true
        });
        if(this.props.toggle){
            this.props.toggle('3');
            
        }
       }       
      }

    onBack(){
        if(this.props.toggle){
            this.props.toggle('1');
        }
      }

      confirmPhraseBackup(e){
          const confirmText = e.target.value.trim();
          this.setState({
              confirmText,
          })

          const { confirmPhrase } = this.state;
            if(confirmText === confirmPhrase){
                this.setState({
                    isBackupConfirm: true,
                    errorText: ''
                })
            }else{
                this.setState({
                    isBackupConfirm: false,
                    errorText: 'Type ‘’ I have written down the phrase’’',
                })
            }
      }

      copyToClipboard(copyText) {
            clipboard.writeText(copyText);            
      }

    copyMnemonic(copyText){
        this.copyToClipboard(copyText)
    }

    copyAddress(copyText){
        this.copyToClipboard(copyText);
    }


    printAccountData(){
        return(
            <div ref={el => (this.printThisData = el) }>
               <div className="print-screen">
                    <Row className="mx-0">
                        <Col className="pt-3">
                            <Row>
                                <Col>
                                    <p className="address large">Your Address</p>
                                </Col>
                            </Row>
                            <Row>
                            <Col className="text-right">
                                    <QRCodeIcon 
                                    className=''
                                    address="abc"
                                    //  icon={fantomIcon}
                                    text='FANTOM'
                                    />
                                </Col>
                                <Col className="pt-4">
                                    <p className="account-no roboto" style={{marginBottom:'54px'}}>0x59d50B3XXXXXXXXXXXXXXXXXXXCBE154D</p>
                                    <div className="light-text">
                                        <p>This password encrypts your private key.</p>
                                        <p>This does not act as a seed to generate your keys.</p>
                                        <p>You will need this password + mnemonickey to unlock your wallet.</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="brand px-0">
                            <div className="brand-body">
                                <p className="logo"><img src={smallLogo} />Fantom</p>
                                <a htef="https://fantom.foundation/" className="link">https://fantom.foundation/</a>
                            </div>
                        </Col>
                    </Row>
               </div>


<div className="print-screen">
                    <Row className="mx-0">
                        <Col className="pt-3" style={{paddingLeft:'49px'}}>
                            <Row>
                                <Col className="pr-0">
                                    <p className="address mb-0">Your Address</p>
                                    <p className="account-no mb-2">0x59d50B3XXXXXXXXXXXXXXXXXXXCBE154D</p>
                                    <p className="mb-0">Mnemonic Phrase</p>
                                    <p>unmoved skewed primary pointing pep prescribe on stage eject unbiased skeleton robot click </p>
                                </Col>
                            </Row>
                            <Row className="qr-with-rotated-text pb-2">
                            <Col >
                                    <QRCodeIcon 
                                    className=''
                                    address="abc"
                                    //  icon={fantomIcon}
                                    text='FANTOM'
                                    />
                                    <p className="address rotate-anti inline-block text-uppercase">Your Address</p>
                                </Col>
                                {/* <Col>
                                    
                                <p className="address rotate-anti inline-block">AMOUNT / NOTES</p>
                                </Col> */}
                            </Row>
                        </Col>
                        <Col className="brand blue px-0">
                            <div className="brand-body">
                                <p className="logo"><img src={smallLogoWhite} />Fantom</p>
                                <a htef="https://fantom.foundation/" className="link">https://fantom.foundation/</a>
                            </div>
                        </Col>
                    </Row>
               </div>
               </div>
        )
    }

    render() {
        return (
            <Row>
                <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                    <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                        <Row className="mx-0">
                            <Col style={{ paddingTop: '46px', paddingBottom: '46px', paddingLeft: '66px', paddingRight: '69px' }}>
                                {/* <AccountDetailPrint 
                                //  ref={e => (this.printThisData = e)}
                                /> */}
                                {
                                    this.printAccountData()
                                }
                                <AccountInfoCard 
                                accountName={this.props.accountName}
                                mnemonic={this.props.mnemonic}  
                                address={this.props.address} 
                                identiconsId={this.props.identiconsId} 
                                ref={el => (this.accountInfoRef = el)}
                                copyAddress={this.copyAddress.bind(this)}
                                copyMnemonic={this.copyMnemonic.bind(this)}
                                />
                                <Row className="my-3 ">
                                    <Col className="text-center">
                                        <ReactToPrint
                                    trigger={() => <Button color="primary">Print Phrase</Button>}
                                    // content={() => this.accountInfoRef} 
                                    content={() => this.printThisData}
                                  />
                                        {/* <Button color="primary">Print Phrase</Button> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text mb-3 black-text">Please back up the recovery phase now. Make sure to keep it private and secure, it allows full and unlimited access to your account.</p>
                                        <p className="text mb-0 black-text">Type "I have written down the phrase"  below to confirm it is backed up.</p>
                                        
                                        <div className="form-element form-input">
                                            <input id="PasswordHint" className="form-element-field" placeholder="the account recovery phrase." type="text" required="" 
                                            onChange={this.confirmPhraseBackup.bind(this)}/>
                                            <div className={` ${this.state.errorText === '' ? 'form-element-bar':'form-text-line' }`} />
                                            {/* <div className="form-element-bar"></div> */}
                                            {/* <label className="form-element-label" for="PasswordHint">Password hint</label> */}
                                            {!this.state.isBackupConfirm && <small className="form-element-hint">{this.state.errorText} </small>}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <FooterButtons onBack={this.onBack.bind(this)}  
                        isBackActive 
                        onNext={this.onNext.bind(this)} 
                        isNextActive={this.state.isBackupConfirm}/>
                    </div>
                    <AccountFooter />
                </Col>
            </Row>
        );
    }
}

export default AccountInfo;