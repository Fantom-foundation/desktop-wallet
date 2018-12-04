import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Web3 from 'web3';
import Loader from '../../general/loader/index';

import successCheck from '../../images/icons/icon-success.svg';
import smallLogo from '../../images/Logo/small-logo.svg';
import logo from '../../images/Logo/fantom-black-logo.png';
import CheckSend from './checkSend/index';
import AccountList from './accountList';
import Store from '../../store/userInfoStore/index';
import { getPrivateKeyOfAddress } from '../../KeystoreManager/index';

/**
 * SendFunds: This component is meant for rendering send funds modal.
 * User can transfer funds only if , password of selected account, from which to transfer is filled.
 */

class SendFunds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      accountType: this.props.accountName,
      ftmAmount: '',
      optionalMessage: '',
      isCheckSend: false,
      isValidAddress: false,
      accountStore: [],
      password: '',
      privateKey: '',
      publicKey: '',
      loading: false,
      verificationError: '',
      addressErrText: '',
      ammountErrText: ''
    };
  }

  // componentWillReceiveProps(nextProps){
  //     const { storeKeys,  publicKey, accountName  } = nextProps;
  //     const userAccountStore = Store.store;
  //     const accountDetailList = [];
  //     for(const key of storeKeys){
  //         accountDetailList.push(userAccountStore[key]);
  //     }
  //     this.setState({
  //         accountStore: accountDetailList,
  //         publicKey,
  //         accountType: accountName,
  //     });
  // }

  componentDidMount() {
    const { storeKeys, publicKey, accountName } = this.props;
    const userAccountStore = Store.store;
    const accountDetailList = [];
    for (const key of storeKeys) {
      accountDetailList.push(userAccountStore[key]);
    }
    this.setState({
      accountStore: accountDetailList,
      publicKey,
      accountType: accountName
    });
  }

  setAddress(e) {
    const address = e.target.value.trim();
    this.setState({
      address
    });
    this.addressVerification(address);
  }

  /**
   * setAccountType() :  To set public key of selected account, and fetch balance for it.
   */
  setAccountType(e) {
    const { accountStore } = this.state;
    const accountType = e.target.value;
    const { length } = accountStore;
    let publicKey = '';
    for (let account = 0; account < length; account += 1) {
      if (accountStore[account].name === accountType) {
        publicKey = accountStore[account].address;
        const { getWalletDetail } = this.props;
        if (getWalletDetail) {
          getWalletDetail(publicKey);
        }
      }
    }
    this.setState({
      accountType,
      publicKey
    });
  }

  setFTMAmount(e) {
    const ftmAmount = e.target.value.trim();
    this.setState({
      ftmAmount
    });
    this.ftmAmmountVerification(ftmAmount);
  }

  setMessage(e) {
    const optionalMessage = e.target.value;
    this.setState({
      optionalMessage
    });
  }

  setPassword(e) {
    const password = e.target.value.trim();
    this.setState({
      password,
      verificationError: ''
    });
  }

  /**
   * handleCheckSend() : User can transfer funds,
   *  only if all detail is filled and private key is retrived for public key and password in state.
   */

  handleCheckSend() {
    const {
      password,
      publicKey,
      loading,
      addressErrText,
      ammountErrText,
      address,
      ftmAmount
    } = this.state;
    if (
      loading ||
      addressErrText !== '' ||
      ammountErrText !== '' ||
      address === '' ||
      ftmAmount === '' ||
      Number(ftmAmount) <= 0 ||
      password === ''
    ) {
      return null;
    }
    const isValidDetail = this.handleSendMoney();
    if (isValidDetail) {
      setTimeout(() => {
        this.getPrivateKeyOfAddress(publicKey, password);
      }, 100);
    }
  }

  handleGoBack() {
    this.setState({
      isCheckSend: false
    });
  }

  /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to CheckSend screen if all fields are filled.
   */
  handleSendMoney() {
    const { address, ftmAmount, password } = this.state;

    let message = '';
    if (address === '') {
      message = 'Please enter address.';
    } else if (!Web3.utils.isAddress(address)) {
      message = 'Please enter valid address.';
    } else if (ftmAmount === '') {
      message = 'Please enter valid amount';
    } else if (password === '') {
      message = 'Please enter password to continue!!';
      this.setState({
        verificationError: message
      });
    }
    if (message !== '') {
      return false;
    }
    this.setState({
      loading: true
    });
    return true;
  }

  /**
   * addressVerification() : To check address entered is valid address or not, if valid address then display green tick. Otherwise render error message.
   */
  addressVerification(address) {
    let message = '';
    if (address === '') {
      message = 'An address must be specified.';
    } else if (!Web3.utils.isAddress(address)) {
      message = 'Must be valid address.';
    }
    if (message === '') {
      this.setState({
        isValidAddress: true,
        addressErrText: ''
      });
    } else {
      this.setState({
        isValidAddress: false,
        addressErrText: message
      });
    }
  }

  /**
   * ftmAmmountVerification() : To check ammount entered is valid or not, if invalid ammount then render error message.
   */
  ftmAmmountVerification(ammount) {
    const { maxFantomBalance } = this.props;
    let message = '';
    if (ammount === '') {
      message = 'An amount must be specified.';
    } else if (isNaN(ammount)) {
      message = 'Must be valid amount. Only numbers.';
    } else if (ammount > maxFantomBalance) {
      message = 'Insufficient balance.';
    }
    if (message === '') {
      this.setState({
        ammountErrText: ''
      });
    } else {
      this.setState({
        ammountErrText: message
      });
    }
  }

  handleModalClose() {
    const { isSendFund, onClose } = this.props;
    if (isSendFund && onClose) {
      onClose();
    }
  }

  /**
   * getPrivateKeyOfAddress() : This function is meant for getting private key.
   * @param {String} publicKey ,
   * @param {String} password ,
   */
  getPrivateKeyOfAddress(publicKey, password) {
    getPrivateKeyOfAddress(publicKey, password)
      .then(res => {
        const hexPrivateKey = res.result;
        this.setState({
          privateKey: hexPrivateKey
        });
        if (hexPrivateKey !== '') {
          this.setState({
            verificationError: '',
            isCheckSend: true,
            loading: false
          });
        }
        return true;
      })
      .catch(() => {
        this.setState({
          verificationError: 'Incorrect password.',
          privateKey: '',
          loading: false
        });
      });
  }

  renderLoader() {
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="loader-holder">
          <Loader sizeUnit="px" size={25} color="#000" loading={loading} />
        </div>
      );
    }
    return null;
  }

  renderVerificationError() {
    const { verificationError } = this.state;
    if (verificationError !== '') {
      return (
        <small
          className="form-element-hint"
          style={{ color: '#FF0000', paddingLeft: '10px' }}
        >
          {verificationError}
        </small>
      );
    }
    return null;
  }

  renderAddressErrText() {
    const { isValidAddress, addressErrText } = this.state;
    if (!isValidAddress && addressErrText !== '') {
      return (
        <small
          className="form-element-hint"
          style={{ color: '#FF0000', paddingLeft: '10px' }}
        >
          {addressErrText}
        </small>
      );
    }
    return null;
  }

  renderAmmountErrText() {
    const { ammountErrText } = this.state;
    if (ammountErrText !== '') {
      return (
        <small
          className="form-element-hint"
          style={{ color: '#FF0000', paddingLeft: '10px' }}
        >
          {ammountErrText}
        </small>
      );
    }
    return null;
  }

  render() {
    const { maxFantomBalance } = this.props;
    const {
      address,
      accountType,
      ftmAmount,
      optionalMessage,
      isCheckSend,
      isValidAddress,
      accountStore,
      publicKey,
      privateKey,
      password,
      loading
    } = this.state;

    let continueBtnColor = 'primary';
    if (loading) {
      continueBtnColor = 'secondary';
    }

    if (
      address === '' ||
      ftmAmount === '' ||
      Number(ftmAmount) <= 0 ||
      password === ''
    ) {
      continueBtnColor = 'secondary';
    }

    return (
      <div id="coin-overley">
        <div
          className="background-overley"
          onClick={this.handleModalClose.bind(this)}
          role="presentation"
        />

        <span
          className="close-btn"
          onClick={this.handleModalClose.bind(this)}
          role="presentation"
        >
          &times;
        </span>

        <div
          className="overley-body p-4 pt-md-5 pb-md-0 "
          style={{ backgroundColor: 'black', fontColor: 'white' }}
        >
          <div>
            {!isCheckSend ? (
              <div>
                <h2
                  className="text-primary title"
                  style={{ marginBottom: '20px' }}
                >
                  {' '}
                  <span>
                    <strong>Send Funds</strong>
                  </span>
                  <img src={smallLogo} className="logo" alt={smallLogo} />
                  <span>FANTOM</span>
                </h2>
                <FormGroup>
                  <Label for="to-address">
                    <strong>To Address</strong>
                  </Label>
                  <div
                    className={`success-check ${
                      isValidAddress ? 'success' : ''
                    }`}
                  >
                    {' '}
                    {/* add or remove --- success --- class  */}
                    <Input
                      type="text"
                      id="to-address"
                      placeholder="Enter Address"
                      value={address}
                      onChange={this.setAddress.bind(this)}
                    />
                    <img src={successCheck} alt={successCheck} />
                  </div>
                  {this.renderAddressErrText()}
                </FormGroup>

                <FormGroup>
                  <Label for="withdraw-from">
                    <strong>Withdraw from</strong>
                  </Label>
                  <div className="withdraw-holder">
                    <AccountList
                      accountType={accountType}
                      accountStore={accountStore}
                      setAccountType={this.setAccountType.bind(this)}
                    />
                    <span className="value-1">{maxFantomBalance} FTM</span>
                  </div>
                </FormGroup>
                <Row className="change">
                  <Col>
                    <FormGroup>
                      <Label for="Amount">
                        <strong>Amount</strong>
                      </Label>
                      <div className="input-holder">
                        <Input
                          type="text"
                          id="to-address"
                          className="text-right"
                          value={ftmAmount}
                          onChange={this.setFTMAmount.bind(this)}
                        />
                      </div>
                      {this.renderAmmountErrText()}
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Label for="to-address">
                    <strong>Enter password : </strong>
                  </Label>
                  <div className="success-check">
                    {' '}
                    {/* add or remove --- success --- class  */}
                    <Input
                      type="password"
                      id="to-password"
                      placeholder="Enter password"
                      value={password}
                      onChange={this.setPassword.bind(this)}
                    />
                    {/* <img src={successCheck} alt={successCheck} /> */}
                  </div>
                  {this.renderVerificationError()}
                </FormGroup>

                <Label for="OptionalMessage">
                  <strong>Note</strong>
                </Label>
                <FormGroup className="mb-1">
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    placeholder="Optional Message"
                    value={optionalMessage}
                    onChange={this.setMessage.bind(this)}
                  />
                </FormGroup>
                <br />
                {!loading && (
                  <center>
                    <Button
                      color={`${continueBtnColor}`}
                      className="text-uppercase"
                      onClick={this.handleCheckSend.bind(this)}
                    >
                      Continue
                    </Button>
                  </center>
                )}

                {/* <span
                  aria-hidden
                  className="pointer"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '42px',
                    fontSize: '25px',
                    lineHeight: '55%',
                    fontWeight: 100,
                    fontFamily: 'Robotos',
                    color: '#8D9BAE'
                  }}
                  onClick={this.handleModalClose.bind(this)}
                >
                  &times;
                </span> */}
                {this.renderLoader()}
              </div>
            ) : (
              <div>
                <img src={logo} height="25.05" alt={logo} />
                <CheckSend
                  handleGoBack={this.handleGoBack.bind(this)}
                  address={address}
                  amount={ftmAmount}
                  memo={optionalMessage || 'none'}
                  publicKey={publicKey}
                  privateKey={privateKey}
                  handleModalClose={this.handleModalClose.bind(this)}
                  refreshWalletDetail={this.props.refreshWalletDetail}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SendFunds;
