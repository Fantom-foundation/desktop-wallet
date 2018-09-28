import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { clipboard } from 'electron';
import { connect } from 'react-redux';
import Web3 from 'web3';
import UserAccountsDetailCard from './userAccountsDetailCard/index';

import arrowLeftRight from '../../images/icons/arrows-left-right.svg';
import Header from '../../general/header/index';

import UserAccount from './userAccounts/index';
import Store from '../../store/userInfoStore/index';
import SendFunds from '../sendFunds/index';
import  getValidAccounts  from '../../KeystoreManager/index';

import * as KeyStoreAction from '../../reducers/keyStore/action';
import * as KeyStoreDetailAction from '../../reducers/keyStoreDetail/action';
import * as UserAccountAction from '../../reducers/userDetail/action';
import config from '../../store/config/index';
import refreshIcon from '../../images/icons/refreshIcon_2.svg';

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
        const coeffArray = parts[0].split('.');
        
        if (direction === -1) {
            coeffArray[0] = Math.abs(coeffArray[0]);
            num = `${zero  }.${  new Array(l).join(zero)  }${coeffArray.join('')}`;
        }
        else {
            const dec = coeffArray[1];
            if (dec) l -= dec.length;
            num = coeffArray.join('') + new Array(l+1).join(zero);
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
        this.state={
            isSendFund: false,
            identiconsId: userDetail.accountIcon,
            name: userDetail. accountName,
            publicKey: userDetail.publicKey,
            storeKeys: [],
            animateRefreshIcon: false,
            isLoading: false,
            isOpenSetting: false,
            gasPrice: 0x000000000001,
            maxFantomBalance: 0,
            balance: 0,
            isOpenAccountDetail: false,
        }
    }


    componentWillMount(){
      setInterval(() => {
        this.getValidAccounts();
      }, 5000)
      this.getValidAccounts();
        
    }


    getIntialUserAccountDetail(){
        const {publicKey, accountName, accountIcon} = this.props;
        return({publicKey, accountName, accountIcon});
    }

    getValidAccounts(){
        getValidAccounts().then((storeKeys) => {
            if(storeKeys.success){
                const {result} = storeKeys;
                const { updateUserAccountDetail, updateKeyStore} = this.props;
                const userAccountDetail =  this.getUserAccountDetail(result);
                const { accountIcon, name, address} = userAccountDetail;
                this.setState({
                    storeKeys: result,
                    identiconsId: accountIcon,
                    name,
                    publicKey: address,
                });
                updateUserAccountDetail(name, accountIcon, address )
                updateKeyStore(result);

                const storeSize = result.length;
                if(storeSize > 0){     
                    this.getWalletBalance(address);
                    this.getWalletTransaction(address);
                }

                return storeKeys.result;
            }
                return [];
        }).catch((err)=>[])
    }

    getUserAccountDetail(storeKeys) {
        const storeSize = storeKeys.length;
        const userAccountDetail = '';
        if(storeSize > 0){
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
    }
    
    getWalletBalance(address) {
        if (configHelper.isEthereumMode) {
            this.getEtherBalanceFromApiAsync(address);
        } else {
            this.getFantomBalanceFromApiAsync(address);
        }
    }
    
    getWalletTransaction(address) {}
    
    // /////////////////////////////////////////   FOR FANTOM OWN END POINT  ///////////////////////////////////////////////////////////////  

    /**
     * getFantomBalanceFromApiAsync() :  Api to fetch wallet balance for given address of Fantom own endpoint.
     * @param { String } address : address to fetch wallet balance.
     */

    getFantomBalanceFromApiAsync(address) {
           const { publicKey } = this.props;
        // const dummyAddress = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
        return fetch(`${configHelper.apiUrl}/account/${address}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.balance) {
                    const balance = scientificToDecimal(responseJson.balance);
                    const valInEther = Web3.utils.fromWei(`${balance}`, 'ether');
                    const walletBalance =  Number(valInEther).toFixed(4);
                   if(publicKey === address){
                       this.setState({
                        balance: walletBalance,
                        // balance: valInEther,
                    });
                   }
                    
                    const { gasPrice } = this.state;
                    const gasPriceEther = Web3.utils.fromWei(`${gasPrice}`, 'ether');
                    let maxFantomBalance = valInEther - gasPriceEther;
                    maxFantomBalance =  Number(maxFantomBalance).toFixed(4);
                    this.setState({
                        maxFantomBalance,
                    })
                }else{
                    if(publicKey === address){
                        this.setState({
                            balance: 0,
                        })
                    }
                    this.setState({
                        maxFantomBalance: 0,
                    })
                }

                this.setState({
                    isLoading: false,
                    animateRefreshIcon: false
                })

                return responseJson;
            })
            .catch((error) => {
                this.setState({
                    maxFantomBalance: 0,
                })
                if(publicKey === address){
                    this.setState({
                        balance: 0,
                        isLoading: false,
                        animateRefreshIcon:false,
                    })
                }
            });
    }
    
    
    /**
     * getFantomTransactionsFromApiAsync():  Api to fetch transactions for given address of Fantom own endpoint.
     * @param {String} address : address to fetch transactions.
     */
    getFantomTransactionsFromApiAsync(address) {
        // console.log('inside getFantomTransactionsFromApiAsync ')
        // const dummyAddress = '0x68a07a9dc6ff0052e42f4e7afa117e90fb896eda168211f040da69606a2aeddc';
        // console.log('inside getFantomTransactionsFromApiAsync dummyAddress', dummyAddress)
        fetch(`${configHelper.apiUrl  }/transaction/${  address}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('inside getFantomTransactionsFromApiAsync responseJson : ', responseJson)
       
                console.log('from fantom own wallet , transaction response : ', responseJson);
                if (responseJson) {} else {
                    this.setState({
                        isLoading: false,
                        animateRefreshIcon: false,
                    });
                }
                return responseJson;
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    animateRefreshIcon: false
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
            animateRefreshIcon: false
        });
    }
    
    // /////////////////////////////////////////   FOR ETHER END POINT  ////////////////////////////////////////////////////////////////     
        
    /**
     * getEtherBalanceFromApiAsync() :  Api to fetch Ether wallet balance for given address.
     * @param { String } address : address to fetch wallet balance.
     */
    async getEtherBalanceFromApiAsync(address) {
       const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
        return fetch(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${  dummyAddress  }&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "1") {
                    const balance = responseJson.result;
                    const valInEther = Web3.utils.fromWei(balance, 'ether');
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
        const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
        fetch(`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${  dummyAddress  }&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson && responseJson.result && responseJson.result.length) {
                    this.loadTransactionData(responseJson);
                } else {
                    this.setState({
                        isLoading: false,
                        animateRefreshIcon: false,
                    });
                }
                return responseJson;
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    animateRefreshIcon: false,
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
            animateRefreshIcon: false,
        });
    }


    handleSelectedAccount(address){
        const selectedAccount = Store.get(address);
        const { name, primaryAccount, accountIcon} = selectedAccount;
        this.props.setAmountData(name,accountIcon,address);
        this.props.updateUserAccountDetail(name, accountIcon, address );
        this.setState({
            isOpenAccountDetail: true,
            identiconsId: accountIcon,
            name,
            publicKey: address,
            balance: '-',
            isLoading: true,
        })
        setTimeout(() => {
            if(address){
                this.getWalletBalance(address);
                // this.getWalletTransaction(address);
            }
            
        }, 10);
       
    }



    copyToClipboard(copyText) {
        clipboard.writeText(copyText);
    }

    handleSettings(){
        const { isOpenSetting } = this.state;
        this.setState({
            isOpenSetting: !isOpenSetting,
        })
    }

    handleCloseSettings(){
        const { isOpenSetting } = this.state;
        this.setState({
            isOpenSetting: false,
        })
    }

    handleUserSettings() {
        const { handleUserSettings } = this.props;
        if (handleUserSettings) {
            handleUserSettings();
            this.setState({
                isOpenSetting: false,
            })
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

    onRefresh(){
        const { publicKey } = this.props;
        this.setState({
            animateRefreshIcon: true,
        });

        if(publicKey){     
            this.getWalletBalance(publicKey);
            this.getWalletTransaction(publicKey);
        }
    }

    refreshWalletDetail(address, to){
        const { publicKey } = this.props;

        this.setState({
            isLoading: true,
        });

        this.forceUpdate();
        console.log('chehck ckk')
       
        if( publicKey.toLowerCase() === address.toLowerCase() || publicKey.toLowerCase() === to.toLowerCase() ){     
            this.getWalletBalance(publicKey);
            this.getWalletTransaction(publicKey);
        }
    }

    getWalletDetail(address){

        if(address){
            this.getWalletBalance(address);
            this.getWalletTransaction(address);
        }

    }

    renderAccountManagement(){
        const { storeKeys, publicKey, isOpenAccountDetail } = this.state;
        if(isOpenAccountDetail){
            return null;
        }
        if(Store.size > 0){
            return(
                  <UserAccount
                    storeKeys={storeKeys}
                    address={publicKey}
                    handleSelectedAccount={this.handleSelectedAccount.bind(this)}
                    copyToClipboard={this.copyToClipboard.bind(this)} />
            )
        }
        return null;
        
    }

    renderAccountDetail(){
        const { transactionData, balance, identiconsId, name, publicKey, isOpenAccountDetail } = this.state;
        if(!isOpenAccountDetail){
            return null;
        }
        let transactionLength = 0;
        if (transactionData) {
            transactionLength = transactionData.length;
        }
        return(
            <UserAccountsDetailCard 
                publicKey={publicKey} 
                identiconsId={identiconsId} name={name}
                balance={balance}
                isLoading={this.state.isLoading}
                transactionLength={transactionLength}
                copyToClipboard={this.copyToClipboard.bind(this)}
                transactionData={transactionData}/>
        )
    }

    openAccountManagement(){
        const{ isOpenAccountDetail } = this.state;
        if(isOpenAccountDetail){
            this.setState({
                isOpenAccountDetail: false,
            })
        }
    }

    openWalletRecovery(){
        const { openWalletRecovery }= this.props;
        if( openWalletRecovery ){
            openWalletRecovery();
        }
    }
    
    render() {

        const { transactionData, balance, storeKeys, identiconsId, name,
             publicKey, isLoading, animateRefreshIcon, isOpenSetting , maxFantomBalance, isOpenAccountDetail } = this.state;

        const { accountName } = this.props;
        let transactionLength = 0;
        if (transactionData) {
            transactionLength = transactionData.length;
        }
        

        return (
            <div>
                <Header 
                isWalletSetup isWalletRecover
                openWalletRecovery={this.openWalletRecovery.bind(this)}
                handleSettings={this.handleSettings.bind(this)}
                handleCloseSettings={this.handleCloseSettings.bind(this)}
                handleUserSettings={this.handleUserSettings.bind(this)}
                isOpenSetting={isOpenSetting}
                isOpenAccountDetail={isOpenAccountDetail}
                accountIcon={identiconsId} 
                onCloseSendFunds={this.onCloseSendFunds.bind(this)}
                openAccountManagement={this.openAccountManagement.bind(this)} />
                <section style={{ padding: '12px 0px 50px ' }} onClick={this.handleCloseSettings.bind(this)}>
                    <Container className="bg-white">
                        <Row className="bg-primary py-1 account-management-header">
                            <Col md={5} className="col text-white pl-4 text-uppercase">Account Management</Col>
                            {isOpenAccountDetail && <Col className="col text-white text-uppercase" style={{cursor: 'pointer' }} onClick={() => this.handleSendFunds()}>
                                <img src={arrowLeftRight} className="mr-1" alt='Transfer fund' /> Transfer</Col>}
                                {isOpenAccountDetail && <Col className="text-right" style={{cursor: 'pointer', }} onClick={this.onRefresh.bind(this)} >
                                <img aria-hidden src={refreshIcon} alt="Refresh" style={{ height: '16.6px'}} className={`${animateRefreshIcon && 'rotation anti-clock'}`} /> </Col>}
                        </Row>
                        <Row >
                            <Col className="px-5 py-4">
                                    {this.renderAccountDetail()}
                                    {this.renderAccountManagement()}
                            </Col>
                        </Row>
                    </Container>
                </section>
                {this.state.isSendFund &&  
                   <SendFunds 
                   isSendFund={this.state.isSendFund} 
                   onClose={this.onCloseSendFunds.bind(this)} 
                   accountName={accountName}
                   maxFantomBalance={maxFantomBalance}
                   publicKey={publicKey}
                   storeKeys={storeKeys}
                   refreshWalletDetail={this.refreshWalletDetail.bind(this)}
                   getWalletDetail={this.getWalletDetail.bind(this)}
                   />}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    publicKey: state.userAccountReducer.address,
    accountName: state.userAccountReducer.accountName,
    accountIcon: state.userAccountReducer.accountIcon,

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