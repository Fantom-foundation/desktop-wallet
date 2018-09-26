import React, { Component } from 'react';
import { connect } from 'react-redux';

import WalletSetup from '../walletSetup/index';
import AccountManagement from '../accountManagement/index';
import WalletRecovery from '../walletRecovery/index';
import Store from '../../store/userInfoStore/index';
import { savePrivateKey, getValidAccounts } from '../../KeystoreManager/index';
import Loader from '../../general/loader/index';

import * as KeyStoreAction from '../../reducers/keyStore/action';
import * as KeyStoreDetailAction from '../../reducers/keyStoreDetail/action';
import * as UserAccountAction from '../../reducers/userDetail/action';
import * as CreateAccountAction from '../../reducers/createAccount/action';


class MainPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isUnlock: false,
            isWalletRecovery: false,
            isFetching: true,
            name: '',
            address: '',
            storeKeys: [],
            loading: false,
            accounts: [],
        }
    }

    componentDidMount() {
      getValidAccounts().then((storeKeys) => {
        if (storeKeys && storeKeys.success && storeKeys.result && storeKeys.result.length && storeKeys.result.length > 0) {
          this.setState({
            isFetching: false,
            isUnlock: true,
          })
          return;
        }
        this.setState({
          isFetching: false,
          isUnlock: false,
        })
      }).catch(err => {
        this.setState({
          isFetching: false,
          isUnlock: false,
        })
      })
    }
    
    onUnlockAccount(isUnlock, privateKey, password){
        console.log('onUnlockAccount : ', isUnlock, privateKey, password)
      
        this.setState({
            loading: true,
        })

        setTimeout(() => {

            savePrivateKey(privateKey, password).then((res) => {
                this.setState({
                    loading: false,
                    isUnlock,
                    isWalletRecovery: false,
                })
            }).catch((err) => {
                this.setState({
                    loading: false,
                })
            });
        }, 10000);
        
    }

    setAmountData(name,identiconsId,address){
      
        if(address){
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
            // Store.openInEditor();
        }
        
    }


    handleUserSettings(){
        this.setState({
            isUnlock: false,
            isWalletRecovery: false,
        });
        const accountName = '';
        const password = '';
        const passwordHint = '';
        const accountIcon = '';
        this.props.setNewAccountDetail(accountName, password, passwordHint, accountIcon)
    }

    renderLoader(){
        const { loading, isUnlock } = this.state;
        if(loading && !isUnlock){
            
            return <div className='unlock-loader-holder'>
            <Loader
                sizeUnit="px"
                size={25}
                color="#000"
                loading={loading}
              /></div>
        }
        return null;
    }

    openAccountManagement(){
        const { address } = this.props;
        if(address){
            this.setState({
                isUnlock: true,
                isWalletRecovery: false,
            })
        }else{
            this.setState({
                isUnlock: false,
                isWalletRecovery: false,
            })
        }
       
    }

    openWalletRecovery(){
        this.setState({
            isUnlock: false,
            isWalletRecovery: true,
        });

        const accountName = '';
        const password = '';
        const passwordHint = '';
        const accountIcon = '';
        this.props.setNewAccountDetail(accountName, password, passwordHint, accountIcon)
    }

    renderWalletRecovery(){
        const {  loading  } = this.state;
        return(
            <WalletRecovery loading={loading}
                onUnlockAccount={this.onUnlockAccount.bind(this)} 
                setAmountData={this.setAmountData.bind(this)}
                openAccountManagement={this.openAccountManagement.bind(this)}
                handleUserSettings={this.handleUserSettings.bind(this)} 
                // openWalletRecovery={this.openWalletRecovery.bind(this)}
            />
        )
    }

    renderWalletSetup(){
        const {  loading  } = this.state;
        return(
            <WalletSetup 
                loading={loading}
                onUnlockAccount={this.onUnlockAccount.bind(this)} 
                setAmountData={this.setAmountData.bind(this)}
                openAccountManagement={this.openAccountManagement.bind(this)}
                openWalletRecovery={this.openWalletRecovery.bind(this)}
            />
        )
    }

    renderAccountManagement(){
        return(
            <AccountManagement 
                handleUserSettings={this.handleUserSettings.bind(this)} 
                setAmountData={this.setAmountData.bind(this)}
                openWalletRecovery={this.openWalletRecovery.bind(this)}
            />
        )
    }

    renderScreen(){
        const { isUnlock, loading, isFetching, isWalletRecovery } = this.state;
         if( !isUnlock && !isWalletRecovery ){
            return this.renderWalletSetup();
         }if( isUnlock && !isWalletRecovery ){
            return this.renderAccountManagement();
         } if( !isUnlock && isWalletRecovery ){
             return this.renderWalletRecovery();
         }
             return null;
         
    }


    render(){
        const { isUnlock, loading, isFetching } = this.state;
        if (isFetching) {
          return null;
        }
        return(
                <div style={{position: 'relative'}}>
                   {this.renderScreen()}
                    {this.renderLoader()}
                    
                </div>

        );
    }
}

const mapStateToProps = (state) => ({
    // publicKeyStore: state.keyStoreReducer.publicKeyStore,
    // keyStoreDetail: state.keyStoreDetailReducer.keyStoreDetail,
    address: state.userAccountReducer.address
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
    setNewAccountDetail: (accountName, password, passwordHint, accountIcon) => {
        dispatch({ type: CreateAccountAction.CREATE_NEW_ACCOUNT, accountName, password, passwordHint, accountIcon });
      },
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainPage);