// @flow
import React from 'react';
import {
    Container,
    Row,
    Col,
    TabContent, TabPane, Nav, NavItem, NavLink,
    Form, FormGroup, Input, Button,
} from 'reactstrap';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';

import classnames from 'classnames';
import { Progress } from '../../general/core/index';
import Header from '../../general/header/index';

import AccountFooter from '../../general/footer/account-footer';
import FooterButtons from '../../general/footer/footer-buttons';
import CreateAccount from './createAccount/index';
import AccountInfo from './accountInfo/index';
import ConfirmRecovery from './confirmRecovery/index';
import AccountManagement from '../accountManagement/index';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            email: '',
            password: '',
            passwordHint: '',
            repassword: '',
            progressValue: 33.33,
            date: new Date().getTime(),
            identiconsId: '',
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const mnemonic = Bip39.generateMnemonic();
        const seed = Bip39.mnemonicToSeed(mnemonic); //creates seed buffer
        const mnemonicWords = mnemonic.split(' ');
        this.setState({
            mnemonic,
            mnemonicWords,
            seed,
            loading: false,
        });
        this.walletSetup(seed, mnemonic);

    }

    walletSetup(seed, mnemonic) {
        const root = Hdkey.fromMasterSeed(seed);
        const masterPrivateKey = root.privateKey.toString('hex');
        const addrNode = root.derive("m/44'/60'/0'/0/0");
        const pubKey = EthUtil.privateToPublic(addrNode._privateKey);
        const addr = EthUtil.publicToAddress(pubKey).toString('hex');
        const address = EthUtil.toChecksumAddress(addr);
        const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey);
        this.setState({
            address,
        });
        // const object = {
        //  // user: this.props.userDetails.user,
        //  // icon: this.props.userDetails.icon,
        //   seed,
        //   address,
        //   mnemonic,
        //   pubKey,
        //   hexPrivateKey,
        //   masterPrivateKey,
        // };
        // this.props.updateUserDetails(object);
        console.log('pubKey', pubKey, 'address', address, 'hexPrivateKey', hexPrivateKey);
    }

    //   onUpdate = (key, value) => {
    //     this.setState({
    //         [key]: value,
    //     });
    // }

    // handleClick = (event) => {

    // event.preventDefault();
    // const { email, password, repassword, passwordHint, identiconsId } = this.state;
    // const payload = {
    //     email,
    //     password,
    //     repassword,
    //     passwordHint,
    //     icon: identiconsId,
    // };
    // const hostname = window.location.hostname === 'localhost' ? ':3000' : '';
    // const hyperText = window.location.hostname === 'localhost' ? 'http' : 'https';

    // fetch(`${hyperText}://${window.location.hostname}${hostname}/api/create-account`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    // }).then((res) => res.json())
    //     .then((res) => {
    //         if (res.status === 200) {
    //             console.log('res!!', res);
    //             this.resetFields();
    //         } else {
    //             console.log('error', res);
    //         }
    //     }).catch((err) => console.log(err));
    // }

    // resetFields = () => {
    //     this.setState({
    //         email: '',
    //         password: '',
    //         repassword: '',
    //         passwordHint: '',
    //         identiconsId: '',
    //     });
    // }

    // getRadioData = (event, identiconsId) => {
    //     event.preventDefault();
    //     this.setState({ identiconsId });
    // }
    toggle(tab) {
        if (this.state.activeTab !== tab) {

            let progressValue = 33.33;
            if (tab === '1') {
                progressValue = 33.33;
            } else if (tab === '2') {
                progressValue = 66.66;
            } else if (tab === '3') {

                progressValue = 100;
            }
            this.setState({
                activeTab: tab,
                progressValue,
            });
        }
    }

    onRefresh = () => {
        const newDate = new Date().getTime();
        this.setState({ date: newDate });
    }

    // getMnemonic = () => {
    //     const mnemonic = bip39.generateMnemonic();
    //     bip39.mnemonicToSeedHex(mnemonic);
    //     this.setState({ mnemonic });
    // }

    getRadioIconData(identiconsId) {
        this.setState({
            identiconsId
        })
    }

    render() {

        return (
            <div>
                <Header />
                <section style={{ padding: '118px 0' }}>
                    <Container className="bg-white theme-blue-shadow">
                        <Row>
                            <Col className="px-0">
                                <Nav tabs className="tab-full tab-theme text-center">
                                    {/* <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      Creation type
                    </NavLink>
                  </NavItem> */}
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                        // onClick={() => { this.toggle('1'); }}
                                        >
                                            Create account
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                        // onClick={() => { this.toggle('2'); }}
                                        >
                                            Account information
                                        </NavLink>

                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                        // onClick={() => { this.toggle('3'); }}
                                        >
                                            Confirm
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <Progress type="theme-blue" value={this.state.progressValue} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <CreateAccount
                                            identiconsId={this.state.identiconsId}
                                            date={this.state.date}
                                            toggle={this.toggle.bind(this)}
                                            getRadioIconData={this.getRadioIconData.bind(this)}
                                            onRefresh={this.onRefresh.bind(this)} />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <AccountInfo mnemonic={this.state.mnemonic} address={this.state.address} identiconsId={this.state.identiconsId} toggle={this.toggle.bind(this)} />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <ConfirmRecovery toggle={this.toggle.bind(this)} onUnlockAccount={this.props.onUnlockAccount}
                                            mnemonic={this.state.mnemonic} />
                                    </TabPane>
                                </TabContent>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}

