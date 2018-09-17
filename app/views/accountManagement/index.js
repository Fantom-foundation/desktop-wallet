import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { clipboard } from 'electron';
import { connect } from 'react-redux';

import arrowLeftRight from '../../images/icons/arrows-left-right.svg';
import Header from '../../general/header/index';
import fantomIcon from '../../images/icons/fantom_Icon.png';

import UserAccount from './userAccounts/index';
import QRCodeIcon from '../../general/qr/index';
import Store from '../../store/userInfoStore/index';
import TransactionCard from './transactionCard/index';
import UserAccountDetail from './userAccountDetail/index';
import SendFunds from '../sendFunds/index';
import { savePrivateKey, getValidAccounts } from '../../KeystoreManager/index';

import * as KeyStoreAction from '../../reducers/keyStore/action';
import * as KeyStoreDetailAction from '../../reducers/keyStoreDetail/action';
import * as UserAccountAction from '../../reducers/userDetail/action';

function scientificToDecimal(num) {
    const sign = Math.sign(num);
    // if the number is in scientific notation remove it
    if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        const zero = '0';
        const parts = String(num).toLowerCase().split('e'); // split into coeff and exponent
        const e = parts.pop(); // store the exponential part
        let l = Math.abs(e); // get the number of zeros
        const direction = e/l; // use to determine the zeroes on the left or right
        const coeff_array = parts[0].split('.');
        
        if (direction === -1) {
            coeff_array[0] = Math.abs(coeff_array[0]);
            num = `${zero  }.${  new Array(l).join(zero)  }${coeff_array.join('')}`;
        }
        else {
            const dec = coeff_array[1];
            if (dec) l -= dec.length;
            num = coeff_array.join('') + new Array(l+1).join(zero);
        }
    }
    
    if (sign < 0) {
        num = -num;
    }

    return num;
}

class AccountManagement extends Component {

   
    constructor(props){
        super(props);

        const  userDetail = this.getIntialUserAccountDetail();
        console.log('in account amangement userDetail : ', userDetail);
        this.state={
            isSendFund: false,
            identiconsId: userDetail.accountIcon,
            name: userDetail. accountName,
            publicKey: userDetail.publicKey,
            storeKeys: [],
        }
    }

    // ///////////////////////////////

    componentWillMount(){
        console.log('load store keys to state start');
        this.getValidAccounts();
        console.log('load store keys to state done');
    }
    
    componentDidMount(){
        const { storeKeys, publicKey } = this.state;
        const storeSize = storeKeys.length;
        if(storeSize > 0){     
            this.getWalletBalance(publicKey);
            this.getWalletTransaction(publicKey);
        }
    }

    getIntialUserAccountDetail(){
        const {publicKey, accountName, accountIcon} = this.props;
        return({publicKey, accountName, accountIcon});
    }

    getValidAccounts(){
        // debugger;
        getValidAccounts().then((storeKeys) => {
            // debugger;
            console.log('success in storeKeys : ', storeKeys);
            if(storeKeys.success){
                const userAccountDetail =  this.getUserAccountDetail(storeKeys.result);
                console.log('success in storeKeys  userAccountDetail : ', userAccountDetail)
                this.setState({
                    storeKeys: storeKeys.result,
                    identiconsId: userAccountDetail.accountIcon,
                    name: userAccountDetail.name,
                    publicKey: userAccountDetail.address,
                });
                this.props.updateUserAccountDetail(userAccountDetail.name, userAccountDetail.accountIcon, userAccountDetail.address )
                this.props.updateKeyStore(storeKeys.result);

                return storeKeys.result;
            }
                return [];
        }).catch((err)=>{
            console.log('err in storeData : ', err);  
            return [];
        })
    }

    getUserAccountDetail(storeKeys){
        console.log('getUserAccountDetail storeKeys  :', storeKeys);
        const storeSize = storeKeys.length;
        const userAccountDetail = '';
        if(storeSize > 0){
            // debugger;
            const keys = storeKeys;
            let accountDetail = '';
            for(const key of keys){
                 accountDetail = Store.get(key);
                if(accountDetail.primaryAccount === true){
                   return  accountDetail;
                }
            }
        }
        return userAccountDetail;


        // const storeSize = (Store.size);

        // const userAccountDetail = '';

        // if(storeSize > 0){
        //     const keys = Object.keys(Store.store);
        //     let accountDetail = '';
        //     for(const key of keys){
        //          accountDetail = Store.get(key);
        //         if(accountDetail.primaryAccount === true){
        //            return  accountDetail;
        //         }
        //     }
        // }
        // return userAccountDetail;
    }
    
    // onUnlockAccount(isUnlock, privateKey, password){
    //     console.log('inside unlock');
    //     this.setState({
    //         isUnlock,
    //     });
    //     console.log('private key file creating....')
    //     savePrivateKey(privateKey, password);
    // }

    // setAmountData(name,identiconsId,address){
    //     const  { storeKeys }  = this.state;
       
    //     this.setState({
    //         name,
    //         identiconsId,
    //         address,
    //     });

    //     if(address){
    //         console.log('from setAmountData api call for address  :', address);
    //         this.getWalletBalance(address);
    //         this.getWalletTransaction(address);

    //         const storeSize = storeKeys.length;
    //         if(storeSize > 0){
    //             const keys = storeKeys;             
    //             keys.forEach((key) => {
    //                 const newObj = Store.get(key);
    //                 newObj.primaryAccount = false;
    //                 Store.set(key,newObj); 
    //             })
    //         }
    //         const userStoreData = {
    //             'address': address,
    //             'name':name,
    //             'primaryAccount': true,
    //             'accountIcon': identiconsId,
    //         };
    //         this.props.updateKeyStoreDetail(userStoreData);
    //         Store.set(address, userStoreData );
    //         Store.openInEditor();
    //     }
        
    // }

    getWalletBalance(address) {
        if (configHelper.isEthereumMode) {
            this.getEtherBalanceFromApiAsync(address);
        } else {
            this.getFantomBalanceFromApiAsync(address);
        }
    }
    
    getWalletTransaction(address) {
        // if (configHelper.isEthereumMode) {
        //     this.getEtherTransactionsFromApiAsync(address);
        // } else {
        //     this.getFantomTransactionsFromApiAsync(address);
        // }
    }
    
    // /////////////////////////////////////////   FOR FANTOM OWN END POINT  ///////////////////////////////////////////////////////////////  

    /**
     * getFantomBalanceFromApiAsync() :  Api to fetch wallet balance for given address of Fantom own endpoint.
     * @param { String } address : address to fetch wallet balance.
     */

    getFantomBalanceFromApiAsync(address) {
        const dummyAddress = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
        console.log('test net balance for address :  ', address)
        return fetch(`${configHelper.apiUrl}/account/${address}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.balance) {
                    console.log('test net from address : ', address)
                    console.log('test net responseJson : ', responseJson)
                    const balance = scientificToDecimal(responseJson.balance);
                    console.log('test net balance : ', balance)
                    const valInEther = Web3.utils.fromWei(`${  balance}`, 'ether');
                    console.log('test net valInEther : ', valInEther)
                    this.setState({
                        balance: valInEther,
                    })
                }else{
                    this.setState({
                        balance: '',
                    })
                }

                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    balance: '',
                })
            });
    }
    
    
    /**
     * getFantomTransactionsFromApiAsync():  Api to fetch transactions for given address of Fantom own endpoint.
     * @param {String} address : address to fetch transactions.
     */
    getFantomTransactionsFromApiAsync(address) {
        const dummyAddress = '0x68a07a9dc6ff0052e42f4e7afa117e90fb896eda168211f040da69606a2aeddc';
    
        fetch(`${configHelper.apiUrl  }/transaction/${  dummyAddress}`)
    
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
        const publicKey = '0xfd00a5fe03cb4672e4380046938cfe5a18456df4'.toLowerCase();
        // let publicKey = this.props.publicKey.toLowerCase();
        let type = '';
        let transactionId = '';
        // for (let data of result) {
        const data = result;
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
                type,
                amount: valInEther,
                transactionId,
                transactionStatus,
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
    
    // /////////////////////////////////////////   FOR ETHER END POINT  ////////////////////////////////////////////////////////////////     
        
    /**
     * getEtherBalanceFromApiAsync() :  Api to fetch Ether wallet balance for given address.
     * @param { String } address : address to fetch wallet balance.
     */
    async getEtherBalanceFromApiAsync(address) {
        console.log('getEtherBalanceFromApiAsync api called');
       const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
        return fetch(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${  dummyAddress  }&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "1") {
                    const balance = responseJson.result;
                    const valInEther = Web3.utils.fromWei(balance, 'ether');
                    console.log('ether balance from api : ', balance);
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
     * getEtherTransactionsFromApiAsync():  Api to fetch transactions for given address.
     * @param {String} address : address to fetch transactions.
     */
    getEtherTransactionsFromApiAsync(address) {
        console.log('getEtherTransactionsFromApiAsync api called');
        const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
        fetch(`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${  dummyAddress  }&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.result && responseJson.result.length) {
                    console.log('transaction responseJson : ', responseJson);
                    this.loadTransactionData(responseJson);
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
     * loadTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
     * @param {*} responseJson : Json of transaction response data from Api.
     */
    loadTransactionData(responseJson) {
        let transactionData = [];
        // let publicKey = this.props.publicKey.toLowerCase();
        
        let publicKey = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
        publicKey = publicKey.toLowerCase();
        let type = '';
        let transactionId = '';
        for (const data of responseJson.result) {
            if (publicKey === data.from.toLowerCase()) {
                type = 'SENT';
                transactionId = data.to;
            } else if (publicKey === data.to.toLowerCase()) {
                type = 'RECEIVED';
                transactionId = data.from;
            }
           
            if (publicKey === data.from || publicKey === data.to) {
                const value = data.value;
                const valInEther = Web3.utils.fromWei(value, 'ether');
                transactionData.push({
                    type,
                    amount: valInEther,
                    transactionId,
                    time: data.timeStamp,
                    amountUnit: 'FTM',
                    from: data.from,
                    to: data.to,
                    isError: data.isError,
                    hash:data.hash
                });
            }
        }
        transactionData = transactionData.reverse();
        this.setState({
            transactionData,
            isLoading: false,
        });
    }


    handleSelectedAccount(address){
        console.log('selected account address : ', address);
        const selectedAccount = Store.get(address);
        console.log('selected account : ', selectedAccount);
        const { name, primaryAccount, accountIcon} = selectedAccount;
        this.props.setAmountData(name,accountIcon,address);
        this.setState({
            identiconsId: accountIcon,
            name,
            publicKey: address,
        })
    }


    // ////////////////////////////////

    copyToClipboard(copyText) {
        clipboard.writeText(copyText);
    }

    handleUserSettings() {
        const { handleUserSettings } = this.props;
        if (handleUserSettings) {
            handleUserSettings();
        }
    }

    handleSendFunds(){
        this.setState({
            isSendFund: true,
        })
    }

    onCloseSendFunds(){
        this.setState({
            isSendFund: false,
        })
    }
    
    render() {

        const {transactionData, balance, storeKeys, identiconsId, name, publicKey,   } = this.state;
        console.log('in account amangement publicKey : ', publicKey);
        let transactionLength = 0;
        if (transactionData) {
            transactionLength = transactionData.length;
        }
        return (
            <div>
                <Header handleUserSettings={this.handleUserSettings.bind(this)} accountIcon={identiconsId} />
                <section style={{ padding: '118px 0' }}>
                    <Container className="bg-white">
                        <Row className="bg-primary py-1 account-management-header">
                            <Col md={5} className="col text-white pl-4 text-uppercase">Account Management</Col>
                            <Col className="col text-white text-uppercase" style={{cursor: 'pointer' }} onClick={() => this.handleSendFunds()}>
                                <img src={arrowLeftRight} className="mr-1" alt='Transfer fund' /> Transfer</Col>
                        </Row>
                        <Row >
                            <Col className="px-5 py-4">
                                <Row className="bg-gray ">

                                    <UserAccountDetail
                                        identiconsId={identiconsId}
                                        name={name}
                                        address={publicKey}
                                        balance={balance}
                                        transactionLength={transactionLength}
                                        copyToClipboard={this.copyToClipboard.bind(this)} />
                                    <Col>
                                        <QRCodeIcon
                                            className='text-right gray-column large qr'
                                            address={publicKey}
                                            icon={fantomIcon}
                                            text='FANTOM'
                                        />
                                    </Col>
                                    
                                </Row>
                                <TransactionCard transactionData={transactionData} />
                                {Store.size > 1 && <UserAccount
                                    address={publicKey}
                                    handleSelectedAccount={this.handleSelectedAccount.bind(this)}
                                    copyToClipboard={this.copyToClipboard.bind(this)} />}
                            </Col>
                        </Row>
                    </Container>
                </section>
                {this.state.isSendFund &&  
                   <SendFunds 
                   isSendFund={this.state.isSendFund} 
                   onClose={this.onCloseSendFunds.bind(this)} 
                //    privateKey={privateKey} 
                   publicKey={publicKey}
                   userAccountStore={storeKeys}
                //    userAccountStore={userAccountStore}
                   />}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    publicKey: state.userAccountReducer.address,
    accountName: state.userAccountReducer.accountName,
    accountIcon: state.userAccountReducer.accountIcon,

    // privateKey: state.keyReducer.privateKey,
    // password: state.createAccountReducer.password,

    publicKeyStore: state.keyStoreReducer.publicKeyStore,
    keyStoreDetail: state.keyStoreDetailReducer.keyStoreDetail,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateKeyStore: (publicKeyStore) => {
        dispatch({ type: KeyStoreAction.UPDATE_KEY_STORE, publicKeyStore });
      },
    updateKeyStoreDetail: (keyStoreDetail) => {
        dispatch({ type: KeyStoreDetailAction.UPDATE_KEY_STORE_DETAIL, keyStoreDetail });
    },
    updateUserAccountDetail: ( accountName, accountIcon, address ) => {
        dispatch({ type: UserAccountAction.USER_ACCOUNT_DETAIL, accountName, accountIcon, address });
    },
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);