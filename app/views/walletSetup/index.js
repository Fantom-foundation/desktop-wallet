// @flow
import React,{Component} from 'react';
import {
    Container,
    Row,
    Col,
    TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Progress } from '../../general/core/index';
import Header from '../../general/header/index';

import CreateAccount from './createAccount/index';
import AccountInfo from './accountInfo/index';
import ConfirmRecovery from './confirmRecovery/index';

import * as KeyAction from '../../reducers/keys/action';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            progressValue: 33.33,
            date: new Date().getTime(),
            isOpenSetting: false,
        };
        this.toggle = this.toggle.bind(this);

        
    }

    componentDidMount() {
        const mnemonic = Bip39.generateMnemonic();
        const seed = Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
        this.walletSetup(seed, mnemonic);
    }

    walletSetup(seed, mnemonic) {
        const { setKeys, setMnemonicCode } = this.props;
        const root = Hdkey.fromMasterSeed(seed);
        const masterPrivateKey = root.privateKey.toString('hex');
        const addrNode = root.derive("m/44'/60'/0'/0/0");
        const pubKey = EthUtil.privateToPublic(addrNode._privateKey);//eslint-disable-line
        const addr = EthUtil.publicToAddress(pubKey).toString('hex');
        const address = EthUtil.toChecksumAddress(addr);
        const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
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

        setKeys(masterPrivateKey, address, hexPrivateKey);
        setMnemonicCode(mnemonic);

        
      }

    toggle(tab) {
        const { activeTab } = this.state;
        if (activeTab !== tab) {

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
    
    onUnlockAccount(isUnlock, privateKey, password){
        const { onUnlockAccount, setAmountData } = this.props;
        if(onUnlockAccount){
            onUnlockAccount(isUnlock, privateKey, password);
        }
        if(setAmountData){
            const { address, accountIcon, accountName} = this.props;
            setAmountData(accountName,accountIcon,address)
        }
    }

    openAccountManagement(){
        const { openAccountManagement } = this.props;
        if(openAccountManagement){
            openAccountManagement();
        }
    }

    handleSettings(){
        const { isOpenSetting } = this.state;
        this.setState({
            isOpenSetting: !isOpenSetting,
        })
    }

    openWalletRecovery(){
        const { openWalletRecovery }= this.props;
        if( openWalletRecovery ){
            openWalletRecovery();
        }
    }
    
    
    render() {
       const { isOpenSetting, activeTab, progressValue, date } = this.state;
       const {accountIconId, loading, accountName, password, passwordHint } = this.props;
       
        return (
            <div >
                <Header accountIcon={accountIconId} 
                openAccountManagement={() => this.openAccountManagement()} 
                openAccount={() => this.openAccountManagement()}
                isWalletRecover
                handleSettings={this.handleSettings.bind(this)}
                isOpenSetting={isOpenSetting}
                openWalletRecovery={this.openWalletRecovery.bind(this)}
                />
                <section style={{ padding: '12px 0px 10px 0px' }}>
                    <Container className="bg-white theme-blue-shadow">
                        <Row>
                            <Col className="px-0">
                                <Nav tabs className="tab-full tab-theme text-center">
                                    
                                    <NavItem>
                                        <NavLink className={classnames({ active: activeTab === '1' })} >
                                            Create account
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink className={classnames({ active: activeTab === '2' })} >
                                            Account information
                                        </NavLink>

                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: activeTab === '3' })}>
                                            Confirm
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <Progress type="theme-blue" value={progressValue} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <CreateAccount 
                                            activeTab={activeTab}
                                            date={date}
                                            accountName={accountName}
                                            // accountIcon={accountIcon} 
                                            password={password}
                                            passwordHint={passwordHint}
                                            toggle={this.toggle.bind(this)} 
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <AccountInfo 
                                            activeTab={activeTab}
                                            toggle={this.toggle.bind(this)}/>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <ConfirmRecovery 
                                            isWaiting={loading} 
                                            activeTab={activeTab} 
                                            toggle={this.toggle.bind(this)} 
                                            onUnlockAccount={this.onUnlockAccount.bind(this)}
                                            openAccountManagement={this.openAccountManagement.bind(this)}
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
    accountIconId: state.userAccountReducer.accountIcon,
    address: state.keyReducer.publicKey,
    password:state.createAccountReducer.password,
    passwordHint: state.createAccountReducer.passwordHint,
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

