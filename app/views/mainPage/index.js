import React, { Component } from 'react';
import WalletSetup from '../walletSetup/index';
import AccountManagement from '../accountManagement/index';
import Store from '../../store/userInfoStore/index';
import SendFunds from '../sendFunds/index';
import Web3 from 'web3';

class MainPage extends Component{
    constructor(props){
        super(props);

        this.state={
            isUnlock: !!Store.size,
            isSendFund: false,
            privateKey: '',
            name: Store.size ? Store.get(Object.keys(Store.store)[0])['name']:'',
            address:Store.size ? Store.get(Object.keys(Store.store)[0])['address']:''
        }
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

    onClose(){
        this.setState({
            isSendFund: false,
        })
    }
    setAmountData(name,id,address, privateKey){
        this.setState({
            name:name,
            id:id,
            address:address,
            privateKey,
        });
        if(address){
            this.getWalletBalance(address);
            this.getWalletTransaction(address);
            const userStoreData = {
                'address': address,
                'privateKey': privateKey,
                'name':name,
            };

            Store.set(address, userStoreData );   

            // Store.set('address',address);
            // Store.set('privateKey',privateKey);
            // Store.set('name',name);
            Store.openInEditor();
        }
        
    }
    componentDidMount(){
        console.log('store  = ', (Store.size));
        
        
        const storeSize = (Store.size);
        // console.log('size of store  = ', storeSize);

        if(storeSize > 0){
            const keys = Object.keys(Store.store);
            const address = Store.get(keys[0]);
            this.getWalletBalance(address);
            this.getWalletTransaction(address);
        }
    }
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
        fetch('http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + dummyAddress + '&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP')
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
        for (let data of responseJson.result) {
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
                    type: type,
                    amount: valInEther,
                    transactionId: transactionId,
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

    render(){
        const publicKey = this.state.address;
        const privateKey = this.state.privateKey;

        console.log('this.state.address : ', this.state.address);

        return(
                <div>
                    { !this.state.isUnlock ? <WalletSetup onUnlockAccount={this.onUnlockAccount.bind(this)} setAmountData={this.setAmountData.bind(this)}/>
                    :
                    <AccountManagement handleSendFunds={this.handleSendFunds.bind(this)} balance={this.state.balance} 
                    transactionData={this.state.transactionData}name={this.state.name} id={this.state.id} address={this.state.address}
                    handleUserSettings={this.handleUserSettings.bind(this)}/>}
                   {this.state.isSendFund &&  <SendFunds onClose={this.onClose.bind(this)} privateKey={privateKey} publicKey={publicKey}/>}
                </div>
        );
    }
}
export default MainPage;