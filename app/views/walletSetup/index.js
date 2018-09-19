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
            address:''
        };
        this.toggle = this.toggle.bind(this);

        
    }

    componentDidMount() {
        const mnemonic = Bip39.generateMnemonic();
        const seed = Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
        const mnemonicWords = mnemonic.split(' ');
        this.setState({
            mnemonic,
            mnemonicWords,
            seed,
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

        this.props.setKeys(masterPrivateKey, address, hexPrivateKey);
        this.props.setMnemonicCode(mnemonic);

        
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
    
    onUnlockAccount(isUnlock, privateKey, password){
        if(this.props.onUnlockAccount){
            this.props.onUnlockAccount(isUnlock, privateKey, password);
        }
        if(this.props.setAmountData){
            const { address, accountIcon, accountName} = this.props;
            this.props.setAmountData(accountName,accountIcon,address)
        }
    }

    openAccountManagement(){
        const {openAccountManagement} = this.props;
        if(openAccountManagement){
            openAccountManagement();
        }
    }
    
    
    render() {
       const { mnemonic, address } = this.state;
       const {accountIconId, loading, accountName, accountIcon, password, passwordHint } = this.props;
       
        return (
            <div >
                <Header accountIcon={accountIconId} openAccountManagement={() => this.openAccountManagement()} />
                <section style={{ padding: '118px 0' }}>
                    <Container className="bg-white theme-blue-shadow">
                        <Row>
                            <Col className="px-0">
                                <Nav tabs className="tab-full tab-theme text-center">
                                    
                                    <NavItem>
                                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} >
                                            Create account
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} >
                                            Account information
                                        </NavLink>

                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: this.state.activeTab === '3' })}>
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
                                            date={this.state.date}
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
                                            activeTab={this.state.activeTab}
                                            toggle={this.toggle.bind(this)}/>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <ConfirmRecovery 
                                            isWaiting={loading} 
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

