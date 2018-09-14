import React, { Component } from 'react';
import {
    Row,
    Col,
    Button
} from 'reactstrap';
import ReactToPrint from 'react-to-print';
import { clipboard } from 'electron';

import AccountFooter from '../../../general/footer/account-footer';
import AccountInfoCard from './accountInfoCard';
import FooterButtons from '../../../general/footer/footer-buttons';
import AccountDetailPrint from './accountDetailPrint';

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmText: '',
            confirmPhrase: 'I have written down the phrase',
            isBackupConfirm: false,
            errorText: '',
        }
    }

    onNext() {
        const { confirmText, confirmPhrase } = this.state;
        if (confirmText === confirmPhrase) {
            this.setState({
                isBackupConfirm: true
            });
            if (this.props.toggle) {
                this.props.toggle('3');

            }
        }
    }

    onBack() {
        if (this.props.toggle) {
            this.props.toggle('1');
        }
    }

    confirmPhraseBackup(e) {
        const confirmText = e.target.value.trim();
        this.setState({
            confirmText,
        })

        const { confirmPhrase } = this.state;
        if (confirmText === confirmPhrase) {
            this.setState({
                isBackupConfirm: true,
                errorText: ''
            })
        } else {
            this.setState({
                isBackupConfirm: false,
                errorText: 'Type ‘’ I have written down the phrase’’',
            })
        }
    }

    copyToClipboard(copyText) {
        clipboard.writeText(copyText);
    }

    copyMnemonic(copyText) {
        this.copyToClipboard(copyText)
    }

    copyAddress(copyText) {
        this.copyToClipboard(copyText);
    }


    printAccountData() {
        const {mnemonic, address} = this.props;
        return (
            <div style={{ display: 'none' }}>
                <div ref={el => (this.printAccountDetail = el)}>
                    <AccountDetailPrint mnemonic={mnemonic} address={address}/>
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

                                {this.printAccountData()}
                                <AccountInfoCard
                                    accountName={this.props.accountName}
                                    mnemonic={this.props.mnemonic}
                                    address={this.props.address}
                                    identiconsId={this.props.identiconsId}
                                    copyAddress={this.copyAddress.bind(this)}
                                    copyMnemonic={this.copyMnemonic.bind(this)}
                                />
                                <Row className="my-3 ">
                                    <Col className="text-center">
                                        <ReactToPrint
                                            trigger={() => <Button color="primary">Print Phrase</Button>}
                                            content={() => this.printAccountDetail}
                                        />
                                    </Col>
                                </Row>
                                <Row >
                                    <Col>
                                        <p className="text mb-3 black-text">Please back up the recovery phase now. Make sure to keep it private and secure, it allows full and unlimited access to your account.</p>
                                        <p className="text mb-0 black-text">Type "I have written down the phrase"  below to confirm it is backed up.</p>

                                        <div className="form-element form-input">
                                            <input id="PasswordHint" className="form-element-field" placeholder="the account recovery phrase." type="text" required=""
                                                onChange={this.confirmPhraseBackup.bind(this)} />
                                            <div className={` ${this.state.errorText === '' ? 'form-element-bar' : 'form-text-line'}`} />
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
                            isNextActive={this.state.isBackupConfirm} />
                    </div>
                    <AccountFooter />
                </Col>
            </Row>
        );
    }
}

export default AccountInfo;