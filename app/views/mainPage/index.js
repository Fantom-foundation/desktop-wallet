import React, { Component } from 'react';
import Web3 from 'web3';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { stat } from 'fs-extra-p';
import QRCodeIcon from '../../general/qr/index';
// import fantomIcon from '../../images/icons/fantom_Icon.png';
// import fantomIcon from '../../images/Logo/small-logo.svg';

import WalletSetup from '../walletSetup/index';
import AccountManagement from '../accountManagement/index';
import Store from '../../store/userInfoStore/index';
import SendFunds from '../sendFunds/index';
import config from '../../store/config/index';
import smallLogo from '../../images/Logo/small-logo.svg';
import smallLogoWhite from '../../images/Logo/small-logo-white.svg';

import { savePrivateKey } from '../../KeystoreManager/index';

import * as KeyStoreAction from '../../reducers/keyStore/action';
import * as KeyStoreDetailAction from '../../reducers/keyStoreDetail/action';
import * as UserAccountAction from '../../reducers/userDetail/action';

const configHelper = config();

// function scientificToDecimal(num) {
//     const sign = Math.sign(num);
//     // if the number is in scientific notation remove it
//     if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
//         const zero = '0';
//         const parts = String(num).toLowerCase().split('e'); // split into coeff and exponent
//         const e = parts.pop(); // store the exponential part
//         let l = Math.abs(e); // get the number of zeros
//         const direction = e/l; // use to determine the zeroes on the left or right
//         const coeff_array = parts[0].split('.');
        
//         if (direction === -1) {
//             coeff_array[0] = Math.abs(coeff_array[0]);
//             num = `${zero  }.${  new Array(l).join(zero)  }${coeff_array.join('')}`;
//         }
//         else {
//             const dec = coeff_array[1];
//             if (dec) l -= dec.length;
//             num = coeff_array.join('') + new Array(l+1).join(zero);
//         }
//     }
    
//     if (sign < 0) {
//         num = -num;
//     }

//     return num;
// }

class MainPage extends Component{
    constructor(props){
        super(props);
        // const userAccountDetail = this.getUserAccountDetail();
        // console.log('MainPage userAccountDetail : ', userAccountDetail);
        this.state={
            // identiconsId: userAccountDetail.accountIcon,
            // isUnlock: !!Store.size,
            // // isUnlock: !!userAccountDetail,
            // // privateKey: this.props.privateKey, 
            // name: userAccountDetail.name,
            // address: userAccountDetail.address,
            // storeKeys: [],

            identiconsId: '',
            isUnlock: !!Store.size,
            name: '',
            address: '',
            storeKeys: [],
        }
    }

    // componentWillMount(){
    //     console.log('load store keys to state start');
    //     getValidAccounts();
    //     console.log('load store keys to state done');
    // }
    
    // componentDidMount(){
    //     console.log('from did mount')
    //     getValidAccounts();
    // const { storeKeys, address } = this.state;
    // const storeSize = storeKeys.length;
    //     if(storeSize > 0){         
    //        console.log('from didmount Api call for userAccountDetail  : ', userAccountDetail);
    //         this.getWalletBalance(userAccountDetail.address);
    //         this.getWalletTransaction(userAccountDetail.address);
    //     }
    // }

    // getValidAccounts(){
    //     debugger;
    //     getValidAccounts().then((storeKeys) =>{
    //         debugger;
    //         console.log('success in storeKeys : ', storeKeys);
    //         if(storeKeys.success){
    //             const userAccountDetail =  this.getUserAccountDetail();
    //             console.log('success in storeKeys  userAccountDetail : ', userAccountDetail)
    //             this.setState({
    //                 storeKeys: storeKeys.result,
    //                 identiconsId: userAccountDetail.accountIcon,
    //                 name: userAccountDetail.name,
    //                 address: userAccountDetail.address,
    //             });

    //             this.props.updateKeyStore(storeKeys.result);
    //             return storeKeys.result;
    //         }
    //             return [];
            
           
    //     }).catch((err)=>{
    //         console.log('err in storeData : ', err);  
    //         return [];
    //     })
    // }

    // getUserAccountDetail(){
    //     const { storeKeys } = this.state;
    //     console.log('getUserAccountDetail storeKeys  :', storeKeys);
    //     const storeSize = storeKeys.length;
    //     const userAccountDetail = '';
    //     if(storeSize > 0){
    //         debugger;
    //         const keys = storeKeys;
    //         let accountDetail = '';
    //         for(const key of keys){
    //              accountDetail = Store.get(key);
    //             if(accountDetail.primaryAccount === true){
    //                return  accountDetail;
    //             }
    //         }
    //     }
    //     return userAccountDetail;


    //     // const storeSize = (Store.size);

    //     // const userAccountDetail = '';

    //     // if(storeSize > 0){
    //     //     const keys = Object.keys(Store.store);
    //     //     let accountDetail = '';
    //     //     for(const key of keys){
    //     //          accountDetail = Store.get(key);
    //     //         if(accountDetail.primaryAccount === true){
    //     //            return  accountDetail;
    //     //         }
    //     //     }
    //     // }
    //     // return userAccountDetail;
    // }
    
    onUnlockAccount(isUnlock, privateKey, password){
        console.log('inside unlock');
        this.setState({
            isUnlock,
        });
        console.log('private key file creating....')
        savePrivateKey(privateKey, password);
    }

    setAmountData(name,identiconsId,address){
        const  { storeKeys }  = this.state;
        this.setState({
            name,
            identiconsId,
            address,
        });

        if(address){
            // console.log('from setAmountData api call for address  :', address);
            // this.getWalletBalance(address);
            // this.getWalletTransaction(address);

            const storeSize = Store.size;
            if(storeSize > 0){
                const keys = Object.keys(Store.store);             
                keys.forEach((key) => {
                    const newObj = Store.get(key);
                    newObj.primaryAccount = false;
                    Store.set(key,newObj); 
                })
            }
            const userStoreData = {
                'address': address,
                'name': name,
                'primaryAccount': true,
                'accountIcon': identiconsId,
            };
            this.props.updateUserAccountDetail(name, identiconsId, address );
            // this.props.updateKeyStoreDetail(userStoreData);
            Store.set( address, userStoreData );
            Store.openInEditor();
        }
        
    }

    // getWalletBalance(address) {
    //     if (configHelper.isEthereumMode) {
    //         this.getEtherBalanceFromApiAsync(address);
    //     } else {
    //         this.getFantomBalanceFromApiAsync(address);
    //     }
    // }
    
    // getWalletTransaction(address) {
    //     // if (configHelper.isEthereumMode) {
    //     //     this.getEtherTransactionsFromApiAsync(address);
    //     // } else {
    //     //     this.getFantomTransactionsFromApiAsync(address);
    //     // }
    // }
    
    // /////////////////////////////////////////   FOR FANTOM OWN END POINT  ///////////////////////////////////////////////////////////////  

    /**
     * getFantomBalanceFromApiAsync() :  Api to fetch wallet balance for given address of Fantom own endpoint.
     * @param { String } address : address to fetch wallet balance.
     */

    // getFantomBalanceFromApiAsync(address) {
    //     const dummyAddress = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
    //     console.log('test net balance for address :  ', address)
    //     return fetch(`${configHelper.apiUrl}/account/${address}`)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             if (responseJson && responseJson.balance) {
    //                 console.log('test net from address : ', address)
    //                 console.log('test net responseJson : ', responseJson)
    //                 const balance = scientificToDecimal(responseJson.balance);
    //                 console.log('test net balance : ', balance)
    //                 const valInEther = Web3.utils.fromWei(`${  balance}`, 'ether');
    //                 console.log('test net valInEther : ', valInEther)
    //                 this.setState({
    //                     balance: valInEther,
    //                 })
    //             }else{
    //                 this.setState({
    //                     balance: '',
    //                 })
    //             }

    //             return responseJson;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             this.setState({
    //                 balance: '',
    //             })
    //         });
    // }
    
    
    /**
     * getFantomTransactionsFromApiAsync():  Api to fetch transactions for given address of Fantom own endpoint.
     * @param {String} address : address to fetch transactions.
     */
    // getFantomTransactionsFromApiAsync(address) {
    //     const dummyAddress = '0x68a07a9dc6ff0052e42f4e7afa117e90fb896eda168211f040da69606a2aeddc';
    
    //     fetch(`${configHelper.apiUrl  }/transaction/${  dummyAddress}`)
    
    //         // fetch(configHelper.apiUrl+'/transactions/'+ dummyAddress)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log('from fantom own wallet , transaction response : ', responseJson);
    //             // if (responseJson && responseJson.result && responseJson.result.length) {
    //             if (responseJson) {
    //                 // this.loadFantomTransactionData(responseJson.result);
    //                 this.loadFantomTransactionData(responseJson);
    //             } else {
    //                 this.setState({
    //                     isLoading: false,
    //                 });
    //             }
    //             return responseJson;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             this.setState({
    //                 isLoading: false,
    //             });
    //         });
    // }
    
    /**
    * loadFantomTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
    * @param {*} responseJson : Json of transaction response data from Api.
    */
    // loadFantomTransactionData(result) {
    //     let transactionData = [];
    //     const publicKey = '0xfd00a5fe03cb4672e4380046938cfe5a18456df4'.toLowerCase();
    //     // let publicKey = this.props.publicKey.toLowerCase();
    //     let type = '';
    //     let transactionId = '';
    //     // for (let data of result) {
    //     const data = result;
    //     if (publicKey === data.from.toLowerCase()) {
    //         type = SENT;
    //         transactionId = data.to;
    //     } else if (publicKey === data.to.toLowerCase()) {
    //         type = RECEIVED;
    //         transactionId = data.from;
    //     }
    //     transactionStatus = (data.failed === false) ? SUCCESS : FAILED;
    //     if (publicKey === data.from || publicKey === data.to) {
    //         const value = data.value || '0';
    //         const valInEther = Web3.utils.fromWei(value, 'ether');
    
    //         transactionData.push({
    //             type,
    //             amount: valInEther,
    //             transactionId,
    //             transactionStatus,
    //             amountUnit: 'FTM',
    //             from: data.from,
    //             to: data.to,
    //             isError: (data.failed === false) ? '0' : '1',
    //         });
    //     }
    //     // }
    //     transactionData = transactionData.reverse();
    //     this.setState({
    //         transactionData,
    //         isLoading: false,
    //     });
    // }
    
    // /////////////////////////////////////////   FOR ETHER END POINT  ////////////////////////////////////////////////////////////////     
        
    /**
     * getEtherBalanceFromApiAsync() :  Api to fetch Ether wallet balance for given address.
     * @param { String } address : address to fetch wallet balance.
     */
    // async getEtherBalanceFromApiAsync(address) {
    //     console.log('getEtherBalanceFromApiAsync api called');
    //    const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
    //     return fetch(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${  dummyAddress  }&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             if (responseJson.status && responseJson.status === "1") {
    //                 const balance = responseJson.result;
    //                 const valInEther = Web3.utils.fromWei(balance, 'ether');
    //                 console.log('ether balance from api : ', balance);
    //                 this.setState({
    //                     balance: valInEther,
    //                 })
    //             }
    //             return responseJson;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }
    
    /**
     * getEtherTransactionsFromApiAsync():  Api to fetch transactions for given address.
     * @param {String} address : address to fetch transactions.
     */
    // getEtherTransactionsFromApiAsync(address) {
    //     console.log('getEtherTransactionsFromApiAsync api called');
    //     const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
    //     fetch(`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${  dummyAddress  }&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             if (responseJson && responseJson.result && responseJson.result.length) {
    //                 console.log('transaction responseJson : ', responseJson);
    //                 this.loadTransactionData(responseJson);
    //             } else {
    //                 this.setState({
    //                     isLoading: false,
    //                 });
    //             }
    //             return responseJson;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             this.setState({
    //                 isLoading: false,
    //             });
    //         });
    // }
    
    /**
     * loadTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
     * @param {*} responseJson : Json of transaction response data from Api.
     */
    // loadTransactionData(responseJson) {
    //     let transactionData = [];
    //     // let publicKey = this.props.publicKey.toLowerCase();
        
    //     let publicKey = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
    //     publicKey = publicKey.toLowerCase();
    //     let type = '';
    //     let transactionId = '';
    //     for (const data of responseJson.result) {
    //         if (publicKey === data.from.toLowerCase()) {
    //             type = 'SENT';
    //             transactionId = data.to;
    //         } else if (publicKey === data.to.toLowerCase()) {
    //             type = 'RECEIVED';
    //             transactionId = data.from;
    //         }
           
    //         if (publicKey === data.from || publicKey === data.to) {
    //             const value = data.value;
    //             const valInEther = Web3.utils.fromWei(value, 'ether');
    //             transactionData.push({
    //                 type,
    //                 amount: valInEther,
    //                 transactionId,
    //                 time: data.timeStamp,
    //                 amountUnit: 'FTM',
    //                 from: data.from,
    //                 to: data.to,
    //                 isError: data.isError,
    //                 hash:data.hash
    //             });
    //         }
    //     }
    //     transactionData = transactionData.reverse();
    //     this.setState({
    //         transactionData,
    //         isLoading: false,
    //     });
    // }

    handleUserSettings(){
        this.setState({
            isUnlock: false,
        })
    }

    // handleSelectedAccount(address){
    //     console.log('selected account address : ', address);
    //     const selectedAccount = Store.get(address);
    //     console.log('selected account : ', selectedAccount);
    //     const { privateKey, name, primaryAccount, accountIcon} = selectedAccount;
    //     this.setAmountData(name,accountIcon,address, privateKey);
    // }

    render(){
        const publicKey = this.state.address;
        const {privateKey, password} = this.props;
        console.log(' after refresh state of component : ', this.state);
        
        
        // console.log('from redux publicKeyStore : ', this.props.publicKeyStore);
        // console.log('from redux keyStoreDetail : ', this.props.keyStoreDetail);

        return(
                <div>
                   
                   { !this.state.isUnlock ? 
                    <WalletSetup 
                    onUnlockAccount={this.onUnlockAccount.bind(this)} 
                    setAmountData={this.setAmountData.bind(this)}
                    accountIconId={this.state.identiconsId}
                    />
                    :
                    <AccountManagement 
                    handleUserSettings={this.handleUserSettings.bind(this)} 
                    // handleSelectedAccount={this.handleSelectedAccount.bind(this)}
                    setAmountData={this.setAmountData.bind(this)}
                    // userAccountStore ={Store.store}
                    // publicKey={publicKey} 
                    />}

                    {/* { !this.state.isUnlock ? 
                    <WalletSetup onUnlockAccount={this.onUnlockAccount.bind(this)} 
                    setAmountData={this.setAmountData.bind(this)}
                    accountIconId={this.state.identiconsId}
                    />
                    :
                    <AccountManagement 
                    balance={this.state.balance} 
                    transactionData={this.state.transactionData} 
                    name={this.state.name} 
                    identiconsId={this.state.identiconsId} 
                    address={this.state.address}
                    handleUserSettings={this.handleUserSettings.bind(this)} 
                    handleSelectedAccount={this.handleSelectedAccount.bind(this)}
                    userAccountStore ={Store.store}
                    privateKey={privateKey} 
                    publicKey={publicKey} password={password}/>} */}
                    
                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    privateKey: state.keyReducer.privateKey,
    password: state.createAccountReducer.password,
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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainPage);