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

import classnames from 'classnames';
import { Progress } from '../../general/core/index';
import Header from '../../general/header/index';

import AccountFooter from '../../general/footer/account-footer';
import FooterButtons from '../../general/footer/footer-buttons';
import CreateAccount from './createAccount/index';
import AccountInfo from './accountInfo/index';
import ConfirmRecovery from './confirmRecovery/index';
import AccountManagement from '../accountManagement/index';

export default class Home extends Component {
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
        };
        this.toggle = this.toggle.bind(this);

        this.loadFantomTransactionData = this.loadFantomTransactionData.bind(this);
    }

///////////******************************************************************************/////////////


getWalletBalance(address) {
    console.log('api called');
    // if (configHelper.isEthereumMode) {
        this.getEtherBalanceFromApiAsync(address);
    // } else {
    //     this.getFantomBalanceFromApiAsync(address);
    // }
}

getWalletTransaction(address) {
    // if (configHelper.isEthereumMode) {
        this.getEtherTransactionsFromApiAsync(address);
    // } else {
    //     this.getFantomTransactionsFromApiAsync(address);
    // }
}

///////////////////////////////////////////   FOR FANTOM OWN END POINT  ////////////////////////////////////////////////////////////////
/**
 * getFantomBalanceFromApiAsync() :  Api to fetch wallet balance for given address of Fantom own endpoint.
 * @param { String } address : address to fetch wallet balance.
 */
getFantomBalanceFromApiAsync(address) {
    let dummyAddress = 0xFD00A5fE03CB4672e4380046938cFe5A18456Df4;
    return fetch(configHelper.apiUrl + '/account/' + dummyAddress)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson && responseJson.balance) {
                const balance = responseJson.balance;
                const valInEther = Web3.utils.fromWei('' + balance, 'ether');
                this.setState({
                    balance: valInEther,
                })
            }
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}


/**
 * getFantomTransactionsFromApiAsync():  Api to fetch transactions for given address of Fantom own endpoint.
 * @param {String} address : address to fetch transactions.
 */
getFantomTransactionsFromApiAsync(address) {
    const dummyAddress = '0x68a07a9dc6ff0052e42f4e7afa117e90fb896eda168211f040da69606a2aeddc';

    fetch(configHelper.apiUrl + '/transaction/' + dummyAddress)

        // fetch(configHelper.apiUrl+'/transactions/'+ dummyAddress)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('from fantom own wallet , transaction response : ', responseJson);
            // if (responseJson && responseJson.result && responseJson.result.length) {
            if (responseJson) {
                // this.loadFantomTransactionData(responseJson.result);
                this.loadFantomTransactionData(responseJson);
            } else {
                this.setState({
                    isLoading: false,
                });
            }
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
            this.setState({
                isLoading: false,
            });
        });
}

/**
* loadFantomTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
* @param {*} responseJson : Json of transaction response data from Api.
*/
loadFantomTransactionData(result) {
    let transactionData = [];
    let publicKey = '0xfd00a5fe03cb4672e4380046938cfe5a18456df4'.toLowerCase();
    // let publicKey = this.props.publicKey.toLowerCase();
    let type = '';
    let transactionId = '';
    // for (let data of result) {
    let data = result;
    if (publicKey === data.from.toLowerCase()) {
        type = SENT;
        transactionId = data.to;
    } else if (publicKey === data.to.toLowerCase()) {
        type = RECEIVED;
        transactionId = data.from;
    }
    transactionStatus = (data.failed === false) ? SUCCESS : FAILED;
    if (publicKey === data.from || publicKey === data.to) {
        const value = data.value || '0';
        const valInEther = Web3.utils.fromWei(value, 'ether');

        transactionData.push({
            type: type,
            amount: valInEther,
            transactionId: transactionId,
            transactionStatus: transactionStatus,
            amountUnit: 'FTM',
            from: data.from,
            to: data.to,
            isError: (data.failed === false) ? '0' : '1',
        });
    }
    // }
    transactionData = transactionData.reverse();
    this.setState({
        transactionData,
        isLoading: false,
    });
}

///////////////////////////////////////////   FOR ETHER END POINT  ////////////////////////////////////////////////////////////////

/**
 * getEtherBalanceFromApiAsync() :  Api to fetch Ether wallet balance for given address.
 * @param { String } address : address to fetch wallet balance.
 */
async getEtherBalanceFromApiAsync(address) {
    console.log('getEtherBalanceFromApiAsync api called');
   const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
    return fetch('https://api-ropsten.etherscan.io/api?module=account&action=balance&address=' + dummyAddress + '&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status && responseJson.status === "1") {
                const balance = responseJson.result;
                // const valInEther = Web3.utils.fromWei(balance, 'ether');
                console.log('ether balance from api : ', balance);
                // this.setState({
                //     balance: valInEther,
                // })
            }
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

/**
 * getEtherTransactionsFromApiAsync():  Api to fetch transactions for given address.
 * @param {String} address : address to fetch transactions.
 */
getEtherTransactionsFromApiAsync(address) {
    console.log('getEtherTransactionsFromApiAsync api called');
    const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
    fetch('http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + dummyAddress + '&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson && responseJson.result && responseJson.result.length) {
                console.log('transaction responseJson : ', responseJson);
                // this.loadTransactionData(responseJson);
            } else {
                // this.setState({
                //     isLoading: false,
                // });
            }
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
            // this.setState({
            //     isLoading: false,
            // });
        });
}

/**
 * loadTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
 * @param {*} responseJson : Json of transaction response data from Api.
 */
loadTransactionData(responseJson) {
    let transactionData = [];
    let publicKey = this.props.publicKey.toLowerCase();
    let type = '';
    let transactionId = '';
    for (let data of responseJson.result) {

        if (publicKey === data.from.toLowerCase()) {
            type = SENT;
            transactionId = data.to;
        } else if (publicKey === data.to.toLowerCase()) {
            type = RECEIVED;
            transactionId = data.from;
        }
        transactionStatus = (data.isError === "0") ? SUCCESS : FAILED;
        if (publicKey === data.from || publicKey === data.to) {
            const value = data.value;
            // const valInEther = Web3.utils.fromWei(value, 'ether');

            transactionData.push({
                type: type,
                amount: valInEther,
                transactionId: transactionId,
                transactionStatus: transactionStatus,
                amountUnit: 'FTM',
                from: data.from,
                to: data.to,
                isError: data.isError
            });
        }
    }
    transactionData = transactionData.reverse();
    this.setState({
        transactionData,
        isLoading: false,
    });
}

///////////******************************************************************************/////////////


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
        console.log('pubKey',pubKey,'public key address',address,'Private Key', hexPrivateKey);

        if (address) {
            this.getWalletBalance(address);
            this.getWalletTransaction(address);
        }
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

    setAccountName(accountName){
        this.setState({
            accountName
        })
    }

    render() {
       const {accountName, mnemonic, address, identiconsId}  =this.state;
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
                                        identiconsId={identiconsId}
                                        date={this.state.date}
                                        toggle={this.toggle.bind(this)} 
                                        getRadioIconData={this.getRadioIconData.bind(this)}
                                        onRefresh={this.onRefresh.bind(this)}
                                        setAccountName={this.setAccountName.bind(this)}/>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <AccountInfo accountName={accountName} mnemonic={mnemonic}
                                         address={address} identiconsId={identiconsId} toggle={this.toggle.bind(this)}/>
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

