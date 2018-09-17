// @flow
import React,{Component} from 'react';
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
import Web3 from 'web3';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Progress } from '../../general/core/index';
import Header from '../../general/header/index';

import AccountFooter from '../../general/footer/account-footer';
import FooterButtons from '../../general/footer/footer-buttons';
import CreateAccount from './createAccount/index';
import AccountInfo from './accountInfo/index';
import ConfirmRecovery from './confirmRecovery/index';
import AccountManagement from '../accountManagement/index';


import * as KeyAction from '../../reducers/keys/action';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            accountName: '',
            email: '',
            password: '',
            passwordHint: '',
            repassword: '',
            progressValue: 33.33,
            date: new Date().getTime(),
            identiconsId: '',
            address:''
        };
        this.toggle = this.toggle.bind(this);

        
    }


// /////////******************************************************************************/////////////


    componentDidMount() {
        const mnemonic = Bip39.generateMnemonic();
        const seed = Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
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
            privateKey: hexPrivateKey
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
        console.log('setKeys called : save to reducer : ')
        this.props.setKeys(masterPrivateKey, address, hexPrivateKey);
        this.props.setMnemonicCode(mnemonic);
        console.log('pubKey',pubKey,'public key address',address,'Private Key', hexPrivateKey);

        
      }

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
        this.setState({ date: newDate, });
    }

    getRadioIconData(identiconsId) {
        this.setState({
            identiconsId
        })
    }

    setAccountName(accountName){
        this.setState({
            accountName
        })
    }
    
    onUnlockAccount(isUnlock, privateKey, password){
        if(this.props.onUnlockAccount){
            this.props.onUnlockAccount(isUnlock, privateKey, password);
        }
        if(this.props.setAmountData){
            const { address, accountIcon, accountName} = this.props;
            this.props.setAmountData(accountName,accountIcon,address)
        }
    }
    
    render() {
       const {accountName, mnemonic, address, identiconsId} = this.state;
       const {accountIcon} = this.props;
        return (
            <div>
                <Header accountIcon={accountIcon}/>
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
                                        activeTab={this.state.activeTab}
                                        identiconsId={identiconsId}
                                        date={this.state.date}
                                        toggle={this.toggle.bind(this)} 
                                        getRadioIconData={this.getRadioIconData.bind(this)}
                                        onRefresh={this.onRefresh.bind(this)}
                                        setAccountName={this.setAccountName.bind(this)}/>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <AccountInfo 
                                        activeTab={this.state.activeTab}
                                        toggle={this.toggle.bind(this)}/>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <ConfirmRecovery 
                                        activeTab={this.state.activeTab} 
                                        toggle={this.toggle.bind(this)} 
                                        onUnlockAccount={this.onUnlockAccount.bind(this)}
                                        />
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


const mapStateToProps = (state) => ({
    accountName: state.createAccountReducer.accountName,
    accountIcon: state.createAccountReducer.accountIcon,
    address: state.keyReducer.publicKey,
});

const mapDispatchToProps = dispatch => ({
  setMasterKey: key => {
    dispatch({ type: KeyAction.MASTER_KEY, key });
  },
  setPublicKey: key => {
    dispatch({ type: KeyAction.PUBLIC_KEY, key });
  },
  setKeys: (masterKey, publicKey, privateKey) => {
    dispatch({ type: KeyAction.MASTER_PUBLIC_PRIVATE_KEY, masterKey, publicKey, privateKey });
  },
  setMnemonicCode: (mnemonic) => {
      dispatch({ type: KeyAction.MNEMONIC_CODE, mnemonic});
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

