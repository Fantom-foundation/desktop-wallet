import React, { Component } from 'react';
import Web3 from 'web3';
import { Row, Col } from 'reactstrap';
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

const configHelper = config();

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

class MainPage extends Component{
    constructor(props){
        super(props);

        const userAccountDetail = this.getUserAccountDetail();
        console.log('userAccountDetail', userAccountDetail)
        this.state={
            identiconsId: userAccountDetail.accountIcon,
            isUnlock: !!Store.size,
            isSendFund: false,
            privateKey: userAccountDetail.privateKey,
            name: userAccountDetail.name,
            address: userAccountDetail.address
        }
    }
    
    componentDidMount(){
       const storeSize = (Store.size);
        if(storeSize > 0){
           const userAccountDetail =  this.getUserAccountDetail();
           console.log('from didmount Api call for userAccountDetail  : ', userAccountDetail);
            this.getWalletBalance(userAccountDetail.address);
            this.getWalletTransaction(userAccountDetail.address);
        }
    }

    getUserAccountDetail(){
        const storeSize = (Store.size);
        const userAccountDetail = '';
        if(storeSize > 0){
            const keys = Object.keys(Store.store);
            let accountDetail = '';
            for(const key of keys){
                 accountDetail = Store.get(key);
                if(accountDetail.primaryAccount === true){
                   return  accountDetail;
                }
            }
        }
        return userAccountDetail;
    }
    
    onUnlockAccount(){
        this.setState({
            isUnlock:true
        })
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

    setAmountData(name,identiconsId,address, privateKey){
        this.setState({
            name,
            identiconsId,
            address,
            privateKey,
        });

        if(address){
            console.log('from setAmountData api call for address  :', address);
            this.getWalletBalance(address);
            this.getWalletTransaction(address);

            const storeSize = (Store.size);
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
                'privateKey': privateKey,
                'name':name,
                'primaryAccount': true,
                'accountIcon': identiconsId,
            };
            Store.set(address, userStoreData );
            // Store.openInEditor();
        }
        
    }

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
        return fetch(`${configHelper.apiUrl  }/account/${  address}`)
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

    handleUserSettings(){
        this.setState({
            isUnlock: false,
        })
    }

    handleSelectedAccount(address){
        console.log('selected account address : ', address);
        const selectedAccount = Store.get(address);
        console.log('selected account : ', selectedAccount);
        const { privateKey, name, primaryAccount, accountIcon} = selectedAccount;
        this.setAmountData(name,accountIcon,address, privateKey);


    }

    render(){
        const publicKey = this.state.address;
        const privateKey = this.state.privateKey;

        return(
                <div>
                   
                    { !this.state.isUnlock ? <WalletSetup onUnlockAccount={this.onUnlockAccount.bind(this)} setAmountData={this.setAmountData.bind(this)}/>
                    :
                    <AccountManagement 
                    handleSendFunds={this.handleSendFunds.bind(this)}
                    balance={this.state.balance} 
                    transactionData={this.state.transactionData} 
                    name={this.state.name} 
                    identiconsId={this.state.identiconsId} 
                    address={this.state.address}
                    handleUserSettings={this.handleUserSettings.bind(this)} 
                    handleSelectedAccount={this.handleSelectedAccount.bind(this)}/>}
                   {this.state.isSendFund &&  
                   <SendFunds isSendFund={this.state.isSendFund} 
                   onClose={this.onCloseSendFunds.bind(this)} 
                   privateKey={privateKey} 
                   publicKey={publicKey}
                   userAccountStore ={Store.store}
                   />}
                </div>

        );
    }
}
export default MainPage;