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

<<<<<<< HEAD
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUnlock: false,
      isWalletRecovery: false,
      isFetching: true,
      loading: false
    };
  }

  componentDidMount() {
    getValidAccounts()
      .then(storeKeys => {
        if (
          storeKeys &&
          storeKeys.success &&
          storeKeys.result &&
          storeKeys.result.length &&
          storeKeys.result.length > 0
        ) {
=======
/** 
 * This is main page for whole application.
 */
class MainPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isUnlock: false,
            isWalletRecovery: false,
            isFetching: true,
            loading: false,
        }
    }

    /**
     * To fetch list of valid keys from file on system.
     */
    componentDidMount() {
      getValidAccounts().then((storeKeys) => {
        if (storeKeys && storeKeys.success && storeKeys.result && storeKeys.result.length && storeKeys.result.length > 0) {
>>>>>>> 8f2c740c4d402493eb2fe4b764d1d55bb807b354
          this.setState({
            isFetching: false,
            isUnlock: true
          });
          return true;
        }
        this.setState({
          isFetching: false,
          isUnlock: false
        });
        return true;
      })
<<<<<<< HEAD
      .catch(() => {
=======
    }
    
    /**
     * onUnlockAccount() :  This function unloacks the account by saving private key to system file using private and password as encryption. 
     * @param {Boolen} isUnlock ,
     * @param {String} privateKey ,
     * @param {String} password ,
     */
    onUnlockAccount(isUnlock, privateKey, password){
        console.log('onUnlockAccount : ', isUnlock, privateKey, password)
      
>>>>>>> 8f2c740c4d402493eb2fe4b764d1d55bb807b354
        this.setState({
          isFetching: false,
          isUnlock: false
        });
      });
  }

  onUnlockAccount(isUnlock, privateKey, password) {
    console.log('onUnlockAccount : ', isUnlock, privateKey, password);

<<<<<<< HEAD
    this.setState({
      loading: true
    });

    setTimeout(() => {
      savePrivateKey(privateKey, password)
        .then(() => {
          this.setState({
            loading: false,
            isUnlock,
            isWalletRecovery: false
          });
          return true;
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    }, 10000);
  }

  setAmountData(name, identiconsId, address) {
    if (address) {
      const storeSize = Store.size;
      if (storeSize > 0) {
        const keys = Object.keys(Store.store);
        keys.forEach(key => {
          const newObj = Store.get(key);
          newObj.primaryAccount = false;
          Store.set(key, newObj);
=======
    /**
     * setAmountData() : This function is meant for saving details of created account to file on system and to reducer.
     * @param {String} name : Account name.
     * @param {string} identiconsId : Account Icon.
     * @param {string} address : Public key.
     */
    setAmountData(name,identiconsId,address){
        const { updateUserAccountDetail } = this.props;
      
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
            updateUserAccountDetail(name, identiconsId, address );
            // this.props.updateKeyStoreDetail(userStoreData);
            Store.set( address, userStoreData );
            // Store.openInEditor();
        }
        
    }

    /**
     * handleUserSettings() :  This function is meant for handling event for click on 'Add Wallet' button in 'setting' on header bar, 
     * for adding new wallet.
     */
    handleUserSettings(){
        const { setNewAccountDetail } = this.props;
        this.setState({
            isUnlock: false,
            isWalletRecovery: false,
>>>>>>> 8f2c740c4d402493eb2fe4b764d1d55bb807b354
        });
      }
      const userStoreData = {
        address,
        name,
        primaryAccount: true,
        accountIcon: identiconsId
      };
      this.props.updateUserAccountDetail(name, identiconsId, address);
      // this.props.updateKeyStoreDetail(userStoreData);
      Store.set(address, userStoreData);
      // Store.openInEditor();
    }
  }

<<<<<<< HEAD
  handleUserSettings() {
    this.setState({
      isUnlock: false,
      isWalletRecovery: false
    });
    const accountName = '';
    const password = '';
    const passwordHint = '';
    const accountIcon = '';
    this.props.setNewAccountDetail(
      accountName,
      password,
      passwordHint,
      accountIcon
    );
  }

  renderLoader() {
    const { loading, isUnlock } = this.state;
    if (loading && !isUnlock) {
      return (
        <div className="unlock-loader-holder">
          <Loader sizeUnit="px" size={25} color="#000" loading={loading} />
        </div>
      );
=======
    /**
     * To render loader on screen when wallet is under creation process or recovery process.
     */
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
>>>>>>> 8f2c740c4d402493eb2fe4b764d1d55bb807b354
    }
    return null;
  }

<<<<<<< HEAD
  openAccountManagement() {
    const { address } = this.props;
    if (address && address !== '') {
      this.setState({
        isUnlock: true,
        isWalletRecovery: false
      });
    } else {
      this.setState({
        isUnlock: false,
        isWalletRecovery: false
      });
=======
    /**
     * openAccountManagement() :  This function is meant for handling event for click on 'Fantom Logo' icon on header bar,
     *  for rendering account management list, if atleast one account is added to wallet.
     */
    openAccountManagement(){
        const { address } = this.props;
        if(address && address !== ''){
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
       
>>>>>>> 8f2c740c4d402493eb2fe4b764d1d55bb807b354
    }
  }

<<<<<<< HEAD
  openWalletRecovery() {
    this.setState({
      isUnlock: false,
      isWalletRecovery: true
    });
=======
    /**
     * openWalletRecovery() :  This function is meant for handling event for click on 'Restore Wallet' button in 'setting' on header bar, 
     * for recovering wallet.
     */
    openWalletRecovery(){
        const { setNewAccountDetail } = this.props;
        this.setState({
            isUnlock: false,
            isWalletRecovery: true,
        });
>>>>>>> 8f2c740c4d402493eb2fe4b764d1d55bb807b354

    const accountName = '';
    const password = '';
    const passwordHint = '';
    const accountIcon = '';
    this.props.setNewAccountDetail(
      accountName,
      password,
      passwordHint,
      accountIcon
    );
  }

  renderWalletRecovery() {
    const { loading } = this.state;
    return (
      <WalletRecovery
        loading={loading}
        onUnlockAccount={this.onUnlockAccount.bind(this)}
        setAmountData={this.setAmountData.bind(this)}
        openAccountManagement={this.openAccountManagement.bind(this)}
        handleUserSettings={this.handleUserSettings.bind(this)}
        // openWalletRecovery={this.openWalletRecovery.bind(this)}
      />
    );
  }

  renderWalletSetup() {
    const { loading } = this.state;
    return (
      <WalletSetup
        loading={loading}
        onUnlockAccount={this.onUnlockAccount.bind(this)}
        setAmountData={this.setAmountData.bind(this)}
        openAccountManagement={this.openAccountManagement.bind(this)}
        openWalletRecovery={this.openWalletRecovery.bind(this)}
      />
    );
  }

  renderAccountManagement() {
    return (
      <AccountManagement
        handleUserSettings={this.handleUserSettings.bind(this)}
        setAmountData={this.setAmountData.bind(this)}
        openWalletRecovery={this.openWalletRecovery.bind(this)}
      />
    );
  }

  renderScreen() {
    const { isUnlock, loading, isFetching, isWalletRecovery } = this.state;
    if (!isUnlock && !isWalletRecovery) {
      return this.renderWalletSetup();
    }
    if (isUnlock && !isWalletRecovery) {
      return this.renderAccountManagement();
    }
    if (!isUnlock && isWalletRecovery) {
      return this.renderWalletRecovery();
    }
    return null;
  }

  render() {
    const { isFetching } = this.state;
    if (isFetching) {
      return null;
    }
    return (
      <div style={{ position: 'relative' }}>
        {this.renderScreen()}
        {this.renderLoader()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // publicKeyStore: state.keyStoreReducer.publicKeyStore,
  // keyStoreDetail: state.keyStoreDetailReducer.keyStoreDetail,
  address: state.userAccountReducer.address
});

const mapDispatchToProps = dispatch => ({
  updateKeyStore: publicKeyStore => {
    dispatch({ type: KeyStoreAction.UPDATE_KEY_STORE, publicKeyStore });
  },
  updateKeyStoreDetail: keyStoreDetail => {
    dispatch({
      type: KeyStoreDetailAction.UPDATE_KEY_STORE_DETAIL,
      keyStoreDetail
    });
  },
  updateUserAccountDetail: (accountName, accountIcon, address) => {
    dispatch({
      type: UserAccountAction.USER_ACCOUNT_DETAIL,
      accountName,
      accountIcon,
      address
    });
  },
  setNewAccountDetail: (accountName, password, passwordHint, accountIcon) => {
    dispatch({
      type: CreateAccountAction.CREATE_NEW_ACCOUNT,
      accountName,
      password,
      passwordHint,
      accountIcon
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
