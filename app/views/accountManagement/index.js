import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { clipboard } from 'electron';
import { connect } from 'react-redux';
import Web3 from 'web3';
import UserAccountsDetailCard from './userAccountsDetailCard/index';
//	import avatar from '../../images/icons/icon.png';
import AppFooter from '../../general/footer/app-footer';

import arrowLeftRight from '../../images/icons/arrows-left-right.svg';
import Header from '../../general/header/index';

import UserAccount from './userAccounts/index';
import Store from '../../store/userInfoStore/index';
import SendFunds from '../sendFunds/index';
import { getValidAccounts } from '../../KeystoreManager/index';

import * as KeyStoreAction from '../../reducers/keyStore/action';
import * as KeyStoreDetailAction from '../../reducers/keyStoreDetail/action';
import * as UserAccountAction from '../../reducers/userDetail/action';
import config from '../../store/config/index';
import refreshIcon from '../../images/icons/refreshIcon_2.svg';
import { scientificToDecimal } from '../../general/util/index';

const configHelper = config();

/**
 * AccountManagement: This is main screen shown when account is added to wallet.
 * By default list of valid accounts is displayed here.
 * ***************************************************************
 * If user selects particuler account from list, details of that account is displayed.
 * user can view transactions and balance and other info of account and can send funds from that account.
 * ***************************************************************
 */

class AccountManagement extends Component {
  constructor(props) {
    super(props);

    const userDetail = this.getIntialUserAccountDetail();
    this.state = {
      isSendFund: false,
      identiconsId: userDetail.accountIcon,
      name: userDetail.accountName,
      publicKey: userDetail.publicKey,
      storeKeys: [],
      animateRefreshIcon: false,
      isLoading: false,
      isOpenSetting: false,
      gasPrice: 0x000000000001,
      maxFantomBalance: 0,
      balance: 0,
      isOpenAccountDetail: false
    };
  }

  /**
   * To fetch list of valid accounts from file on system .
   */
  componentWillMount() {
    this.validAccountDetail = setInterval(() => {
      const { isSendFund } = this.state;
      if (!isSendFund) {
        this.getValidAccounts();
      }
    }, 5000);
    this.getValidAccounts();
  }

  /**
   * To clear the counter for fetching list of valid accounts from file on system .
   */
  componentWillUnmount() {
    clearInterval(this.validAccountDetail);
  }

  /**
   * getIntialUserAccountDetail() : To load initial account info to state, if there already some account is present .
   */
  getIntialUserAccountDetail() {
    const { publicKey, accountName, accountIcon } = this.props;
    return { publicKey, accountName, accountIcon };
  }

  /**
   * getValidAccounts() : Api for getting list of valid accounts and setting the data to state and reducer.
   * updateUserAccountDetail() :  for setting selected account detail in reducer.
   * And then call the balance and transaction apis for that selected accounts.
   */
  getValidAccounts() {
    getValidAccounts()
      .then(storeKeys => {
        if (storeKeys.success) {
          const { result } = storeKeys;
          this.updateStoreKey(result);

          const { updateUserAccountDetail } = this.props;
          const userAccountDetail = this.getUserAccountDetail(result);
          const { accountIcon, name, address } = userAccountDetail;
          this.setState({
            storeKeys: result,
            identiconsId: accountIcon,
            name,
            publicKey: address
          });
          updateUserAccountDetail(name, accountIcon, address);

          const storeSize = result.length;
          if (storeSize > 0) {
            this.getWalletBalance(address);
            // this.getWalletTransaction(address);
          }

          return storeKeys.result;
        }
        return [];
      })
      .catch(() => []);
  }

  /**
   *
   * @param {Array} storeKeys : To get details of primary account from valid keys in storeKeys.
   */
  getUserAccountDetail(storeKeys) {
    const storeSize = storeKeys.length;
    const userAccountDetail = '';
    if (storeSize > 0) {
      const keys = storeKeys;
      let accountDetail = '';
      for (const key of keys) {
        accountDetail = Store.get(key);
        if (accountDetail.primaryAccount === true) {
          return accountDetail;
        }
      }
      return Store.get(storeKeys[0]);
    }
    return userAccountDetail;
  }

  updateStoreKey(storeKeys) {
    const keys = Object.keys(Store.store);
    for (const key of keys) {
      let isValidKey = false;
      for (const validKey of storeKeys) {
        if (validKey === key) {
          isValidKey = true;
          break;
        }
      }
      if (!isValidKey) {
        Store.delete(key);
      }
    }
  }

  /**
   * getWalletBalance()  : To get balance of account.
   * @param {*} address : Public key of account.
   * Based on value of 'configHelper.isEthereumMode'  , balance can be get from 'testNet' for 'etherNet'.
   */
  getWalletBalance(address) {
    if (configHelper.isEthereumMode) {
      this.getEtherBalanceFromApiAsync(address);
    } else {
      this.getFantomBalanceFromApiAsync(address);
    }
  }

  /**
   * getWalletTransaction()  : To get transactions done on that account.
   * @param {*} address : Public key of account.
   * Based on value of 'configHelper.isEthereumMode'  , transactions can be get from 'testNet' for 'etherNet'.
   */
  getWalletTransaction() {
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
    const { publicKey } = this.props;
    // const dummyAddress = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
    return fetch(`${configHelper.apiUrl}/account/${address}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson && responseJson.balance) {
          const balance = scientificToDecimal(responseJson.balance);
          const valInEther = Web3.utils.fromWei(`${balance}`, 'ether');
          const walletBalance = Number(valInEther).toFixed(4);
          if (publicKey === address) {
            this.setState({
              balance: walletBalance
              // balance: valInEther,
            });
          }

          const { gasPrice } = this.state;
          const gasPriceEther = Web3.utils.fromWei(`${gasPrice}`, 'ether');
          let maxFantomBalance = valInEther - gasPriceEther;
          maxFantomBalance = Number(maxFantomBalance).toFixed(4);
          this.setState({
            maxFantomBalance
          });
        } else {
          if (publicKey === address) {
            this.setState({
              balance: 0
            });
          }
          this.setState({
            maxFantomBalance: 0
          });
        }

        this.setState({
          isLoading: false,
          animateRefreshIcon: false
        });

        return responseJson;
      })
      .catch(() => {
        this.setState({
          maxFantomBalance: 0
        });
        if (publicKey === address) {
          this.setState({
            balance: 0,
            isLoading: false,
            animateRefreshIcon: false
          });
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
    fetch(`${configHelper.apiUrl}/transaction/${address}`)
      .then(response => response.json())
      .then(responseJson => {
        console.log(
          'inside getFantomTransactionsFromApiAsync responseJson : ',
          responseJson
        );

        console.log(
          'from fantom own wallet , transaction response : ',
          responseJson
        );
        this.setState({
          isLoading: false,
          animateRefreshIcon: false
        });
        return responseJson;
      })
      .catch(() => {
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
      type = 'SENT';
      transactionId = data.to;
    } else if (publicKey === data.to.toLowerCase()) {
      type = 'RECEIVED';
      transactionId = data.from;
    }
    const transactionStatus = data.failed === false ? 'SUCCESS' : 'FAILED';
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
        isError: data.failed === false ? '0' : '1'
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
  async getEtherBalanceFromApiAsync() {
    const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
    return fetch(
      `https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${dummyAddress}&tag=latest&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status && responseJson.status === '1') {
          const balance = responseJson.result;
          const valInEther = Web3.utils.fromWei(balance, 'ether');
          this.setState({
            balance: valInEther
          });
        }
        return responseJson;
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * getEtherTransactionsFromApiAsync():  Api to fetch transactions for given address.
   * @param {String} address : address to fetch transactions.
   */
  getEtherTransactionsFromApiAsync() {
    const dummyAddress = '0x4d8868F7d7581d770735821bb0c83137Ceaf18FD';
    fetch(
      `http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${dummyAddress}&startblock=0&endblock=99999999&sort=asc&apikey=WQ1D9TBEG4IWFNGZSX3YP4QKXUI1CVAUBP`
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson && responseJson.result && responseJson.result.length) {
          this.loadTransactionData(responseJson);
        } else {
          this.setState({
            isLoading: false,
            animateRefreshIcon: false
          });
        }
        return responseJson;
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          animateRefreshIcon: false
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
          hash: data.hash
        });
      }
    }
    transactionData = transactionData.reverse();
    this.setState({
      transactionData,
      isLoading: false,
      animateRefreshIcon: false
    });
  }

  /**
   * handleSelectedAccount() :  To set selected account from account list to primary account and display that card's detail
   * @param {*} address
   */
  handleSelectedAccount(address) {
    const selectedAccount = Store.get(address);
    const { name, accountIcon } = selectedAccount;
    this.props.setAmountData(name, accountIcon, address);
    this.props.updateUserAccountDetail(name, accountIcon, address);
    this.setState({
      isOpenAccountDetail: true,
      identiconsId: accountIcon,
      name,
      publicKey: address,
      balance: '-',
      isLoading: true
    });
    setTimeout(() => {
      if (address) {
        this.getWalletBalance(address);
        // this.getWalletTransaction(address);
      }
    }, 10);
  }

  /**
   * copyToClipboard() :  To copy content to clipboard.
   * @param {String} copyText
   */
  copyToClipboard(copyText) {
    clipboard.writeText(copyText);
  }

  /**
   * handleSettings() :  To handle toggle event for setting button on header bar.
   *
   */
  handleSettings() {
    const { isOpenSetting } = this.state;
    this.setState({
      isOpenSetting: !isOpenSetting
    });
  }

  /**
   * handleCloseSettings() :  To handle close event for setting button on header bar.
   *
   */
  handleCloseSettings() {
    this.setState({
      isOpenSetting: false
    });
  }

  /**
   * handleUserSettings() :  This function is meant for handling event for click on 'Add Wallet' button in 'setting on header bar,
   * for adding new wallet, and close setting menu.
   */
  handleUserSettings() {
    const { handleUserSettings } = this.props;
    if (handleUserSettings) {
      handleUserSettings();
      this.setState({
        isOpenSetting: false
      });
    }
  }

  /**
   * handleSendFunds() :  This function is meant for opening send funds modal.
   */
  handleSendFunds() {
    this.setState({
      isSendFund: true
    });
  }

  /**
   * onCloseSendFunds() :  This function is meant for closing send funds modal.
   */
  onCloseSendFunds() {
    this.setState({
      isSendFund: false
    });
  }

  /**
   * onRefresh() :  This function is meant for refreshing the wallet i.e fetching balance and transaction.
   */
  onRefresh() {
    const { publicKey } = this.props;
    this.setState({
      animateRefreshIcon: true
    });

    if (publicKey) {
      this.getWalletBalance(publicKey);
      // this.getWalletTransaction(publicKey);
    }
  }

  /**
   * refreshWalletDetail() : Refresh wallet details after sending funds.
   * @param {*} address : Address of account from which funds are transfered.
   * @param {*} to : address of account to which funds are transfered.
   */
  refreshWalletDetail(address, to) {
    const { publicKey } = this.props;

    this.setState({
      isLoading: true
    });

    this.forceUpdate();

    if (
      publicKey.toLowerCase() === address.toLowerCase() ||
      publicKey.toLowerCase() === to.toLowerCase()
    ) {
      this.getWalletBalance(publicKey);
      // this.getWalletTransaction(publicKey);
    }
  }

  getWalletDetail(address) {
    if (address) {
      this.getWalletBalance(address);
      // this.getWalletTransaction(address);
    }
  }

  /**
   * renderAccountManagement() : To render AccountManagement screen with list of valid accounts, by default this screen is rendred.
   */
  renderAccountManagement() {
    const { storeKeys, publicKey, isOpenAccountDetail } = this.state;
    if (isOpenAccountDetail) {
      return null;
    }
    if (Store.size > 0) {
      return (
        <UserAccount
          storeKeys={storeKeys}
          address={publicKey}
          handleSelectedAccount={this.handleSelectedAccount.bind(this)}
          copyToClipboard={this.copyToClipboard.bind(this)}
        />
      );
    }
    return null;
  }

  /**
   * renderAccountDetail() : To render detail of selected account from liat.
   */
  renderAccountDetail() {
    const {
      transactionData,
      balance,
      identiconsId,
      name,
      publicKey,
      isOpenAccountDetail
    } = this.state;
    if (!isOpenAccountDetail) {
      return null;
    }
    let transactionLength = 0;
    if (transactionData) {
      transactionLength = transactionData.length;
    }

    // document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    return (
      <UserAccountsDetailCard
        publicKey={publicKey}
        identiconsId={identiconsId}
        name={name}
        balance={balance}
        isLoading={this.state.isLoading}
        transactionLength={transactionLength}
        copyToClipboard={this.copyToClipboard.bind(this)}
        transactionData={transactionData}
      />
    );
  }

  /**
   * openAccountManagement() :  This function is meant for handling event for click on 'Fantom Logo' icon on header bar,
   *  for rendering account management list.
   */

  openAccountManagement() {
    const { isOpenAccountDetail } = this.state;
    if (isOpenAccountDetail) {
      this.setState({
        isOpenAccountDetail: false
      });
    }
  }

  /**
   * openWalletRecovery() :  This function is meant for handling event for click on 'Restore Wallet' button in 'setting' on header bar,
   *  for recovering  wallet.
   */
  openWalletRecovery() {
    const { openWalletRecovery } = this.props;
    if (openWalletRecovery) {
      openWalletRecovery();
    }
  }

  render() {
    const {
      storeKeys,
      identiconsId,
      publicKey,
      animateRefreshIcon,
      isOpenSetting,
      maxFantomBalance,
      isOpenAccountDetail
    } = this.state;

    const { accountName } = this.props;

    return (
      <div>
        <Header
          isWalletSetup
          isWalletRecover
          openWalletRecovery={this.openWalletRecovery.bind(this)}
          handleSettings={this.handleSettings.bind(this)}
          handleCloseSettings={this.handleCloseSettings.bind(this)}
          handleUserSettings={this.handleUserSettings.bind(this)}
          isOpenSetting={isOpenSetting}
          isOpenAccountDetail={isOpenAccountDetail}
          accountIcon={identiconsId}
          onCloseSendFunds={this.onCloseSendFunds.bind(this)}
          openAccountManagement={this.openAccountManagement.bind(this)}
        />
        <section className="page-title">
          <Container>
            <Row>
              <Col>
                <h2 className="title text-white text-center text-uppercase m-0">
                  <span>Account Management</span>
                </h2>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="bg-dark" style={{ padding: '0 0 120px' }}>
          <Container className="account-card-container">
            <Row style={{ marginBottom: '90px' }}>
              <Col>
                <div className="add-wallet">
                  <h2 className="title ">
                    <span>Accounts</span>
                  </h2>
                  <Button>
                    <i className="fas fa-plus" />
                  </Button>
                </div>
              </Col>
            </Row>

            {/* 			 

							<Row id="account-card" className="text-center ">
                <Col md={6} lg={3} className="main-col">
                  <div className="accounts-holder">
                    <div className="avatar">
                      <span className="avatar-icon">
                        <img src={avatar} alt="TestAccount" />
                      </span>
                    </div>
                    <h2 className="title ">
                      <span>TestAccount</span>
                    </h2>
                    <div className="account-no">
                      <p>
                        <span>
                          <i className="fas fa-clone" />
                        </span>
                        gfvgv
                      </p>
                    </div>
                  </div>
                </Col>
              </Row> */}

            {this.renderAccountDetail()}
            {this.renderAccountManagement()}
          </Container>

          {/* <Col md={5} className="col text-white pl-4 text-uppercase">
                Account Management
              </Col> */}
          {isOpenAccountDetail && (
            <Container>
              <Row>
                <Col
                  className="col text-white text-uppercase"
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleSendFunds()}
                >
                  <img
                    src={arrowLeftRight}
                    className="mr-1"
                    alt="Transfer fund"
                  />{' '}
                  Transfer
                </Col>

                <Col
                  className="text-right"
                  style={{ cursor: 'pointer' }}
                  onClick={this.onRefresh.bind(this)}
                >
                  <img
                    aria-hidden
                    src={refreshIcon}
                    alt="Refresh"
                    style={{ height: '16.6px' }}
                    className={`${animateRefreshIcon && 'rotation anti-clock'}`}
                  />{' '}
                </Col>
              </Row>
            </Container>
          )}

          {/* <Row>
              <Col className="px-5 py-4">
                {this.renderAccountDetail()}
                {this.renderAccountManagement()}
              </Col>
            </Row> */}
        </section>

        <section
          style={{ padding: '12px 0px 50px ' }}
          onClick={this.handleCloseSettings.bind(this)}
        />
        <AppFooter />
        {this.state.isSendFund && (
          <SendFunds
            isSendFund={this.state.isSendFund}
            onClose={this.onCloseSendFunds.bind(this)}
            accountName={accountName}
            maxFantomBalance={maxFantomBalance}
            publicKey={publicKey}
            storeKeys={storeKeys}
            refreshWalletDetail={this.refreshWalletDetail.bind(this)}
            getWalletDetail={this.getWalletDetail.bind(this)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  publicKey: state.userAccountReducer.address,
  accountName: state.userAccountReducer.accountName,
  accountIcon: state.userAccountReducer.accountIcon,

  publicKeyStore: state.keyStoreReducer.publicKeyStore,
  keyStoreDetail: state.keyStoreDetailReducer.keyStoreDetail
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountManagement);
