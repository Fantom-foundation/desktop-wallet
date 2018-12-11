// @flow
import React, { Component } from 'react';

import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';
import { connect } from 'react-redux';

import Header from '../../general/header/index';
import CreateAccount from './createAccount/index';
import AccountInfo from './accountInfo/index';
import ConfirmRecovery from './confirmRecovery/index';
import CreateAccountSteps from '../createAccountSteps/index';

import * as KeyAction from '../../reducers/keys/action';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      backButtonDisable: true,
      nextButtonDisable: true,
      date: new Date().getTime(),
      isOpenSetting: false,
      revealSecret: false
    };
    this.accountRef = null;
    this.accountInfoRef = null;
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const mnemonic = Bip39.generateMnemonic();
    const seed = Bip39.mnemonicToSeed(mnemonic); // creates seed buffer
    this.walletSetup(seed, mnemonic);
  }

  onNext = () => {
    const { activeTab } = this.state;

    if (activeTab === '1') {
      this.accountRef.wrappedInstance.onNext();
    } else if (activeTab === '2') {
      if (this.accountInfoRef) {
        const accountInfoRef = this.accountInfoRef.wrappedInstance;
        if (
          accountInfoRef.state.confirmationPhrase ===
            'I have written down the phrase' &&
          accountInfoRef.state.revealSecret
        ) {
          this.accountInfoRef.wrappedInstance.onNext();
        }
      }
    }
  };

  onPrev = () => {
    const { activeTab } = this.state;
    if (activeTab === '2') {
      this.toggle('1', 'visited');
    } else if (activeTab === '3') {
      this.toggle('2', 'visited');
    }
  };

  walletSetup(seed, mnemonic) {
    const { setKeys, setMnemonicCode } = this.props;
    const root = Hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); //eslint-disable-line
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const address = EthUtil.toChecksumAddress(addr);
    const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    setKeys(masterPrivateKey, address, hexPrivateKey);
    setMnemonicCode(mnemonic);
  }

  toggle(tab, visited) {
    let backButtonDisable = true;
    let nextButtonDisable = true;
    if (visited) {
      if (tab === '1') {
        backButtonDisable = true;
        nextButtonDisable = false;
      } else if (tab === '2') {
        backButtonDisable = false;
        nextButtonDisable = true;
      } else if (tab === '3') {
        backButtonDisable = false;
        nextButtonDisable = true;
      }
    } else if (tab === '1') {
      backButtonDisable = true;
      nextButtonDisable = true;
    } else if (tab === '2') {
      backButtonDisable = false;
      nextButtonDisable = true;
      if (this.state.revealSecret) {
        nextButtonDisable = false;
      }
    } else if (tab === '3') {
      backButtonDisable = false;
      nextButtonDisable = true;
    }
    this.setState({
      activeTab: tab,
      backButtonDisable,
      nextButtonDisable
    });
  }

  onRefresh = () => {
    const newDate = new Date().getTime();
    this.setState({ date: newDate });
  };

  changeDisableButtons = () => {
    const { activeTab } = this.state;
    let backButtonDisable = true;
    let nextButtonDisable = true;
    if (activeTab === '1') {
      const accountRefInstance = this.accountRef.wrappedInstance;
      backButtonDisable = true;
      nextButtonDisable = accountRefInstance.isNextButtonDisable();
    }
    if (activeTab === '2') {
      let disable = true;
      if (this.accountInfoRef) {
        const accountInfoRef = this.accountInfoRef.wrappedInstance;
        if (
          accountInfoRef.state.confirmationPhrase ===
            'I have written down the phrase' &&
          accountInfoRef.state.revealSecret
        ) {
          disable = false;
        }
      }
      backButtonDisable = false;
      nextButtonDisable = disable;
    }
    if (activeTab === '3') {
      backButtonDisable = false;
      nextButtonDisable = true;
    }
    this.setState({
      backButtonDisable,
      nextButtonDisable
    });
  };

  onUnlockAccount(isUnlock, privateKey, password) {
    const { onUnlockAccount, setAmountData } = this.props;
    if (onUnlockAccount) {
      onUnlockAccount(isUnlock, privateKey, password);
    }
    if (setAmountData) {
      const { address, accountIcon, accountName } = this.props;
      setAmountData(accountName, accountIcon, address);
    }
  }

  openAccountManagement() {
    this.toggle('1');
    const { openAccountManagement } = this.props;
    if (openAccountManagement) {
      openAccountManagement();
    }
  }

  handleSettings() {
    const { isOpenSetting } = this.state;
    this.setState({
      isOpenSetting: !isOpenSetting
    });
  }

  openWalletRecovery() {
    const { openWalletRecovery } = this.props;
    if (openWalletRecovery) {
      openWalletRecovery();
    }
  }

  render() {
    const {
      isOpenSetting,
      activeTab,
      date,
      backButtonDisable,
      nextButtonDisable,
      revealSecret
    } = this.state;
    const {
      accountIconId,
      loading,
      accountName,
      password,
      passwordHint
    } = this.props;

    return (
      <div>
        <Header
          accountIcon={accountIconId}
          openAccountManagement={() => this.openAccountManagement()}
          openAccount={() => this.openAccountManagement()}
          isWalletRecover
          handleSettings={this.handleSettings.bind(this)}
          isOpenSetting={isOpenSetting}
          openWalletRecovery={this.openWalletRecovery.bind(this)}
        />
        <CreateAccountSteps
          onNext={this.onNext}
          onPrev={this.onPrev}
          stepNo={activeTab}
          backButtonDisable={backButtonDisable}
          nextButtonDisable={nextButtonDisable}
        >
          {activeTab === '1' ? (
            <CreateAccount
              ref={component => {
                this.accountRef = component;
              }}
              activeTab={activeTab}
              date={date}
              accountName={accountName}
              // accountIcon={accountIcon}
              password={password}
              passwordHint={passwordHint}
              toggle={this.toggle.bind(this)}
              onRefresh={this.onRefresh.bind(this)}
              changeDisableButtons={this.changeDisableButtons.bind(this)}
            />
          ) : null}
          {activeTab === '2' ? (
            <AccountInfo
              ref={component => {
                this.accountInfoRef = component;
              }}
              activeTab={activeTab}
              revealSecret={revealSecret}
              toggle={this.toggle.bind(this)}
              changeSecret={this.changeSecret}
              changeDisableButtons={this.changeDisableButtons.bind(this)}
            />
          ) : null}
          {activeTab === '3' ? (
            <ConfirmRecovery
              isWaiting={loading}
              activeTab={activeTab}
              toggle={this.toggle.bind(this)}
              onUnlockAccount={this.onUnlockAccount.bind(this)}
              openAccountManagement={this.openAccountManagement.bind(this)}
              changeDisableButtons={this.changeDisableButtons.bind(this)}
            />
          ) : null}
        </CreateAccountSteps>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountName: state.createAccountReducer.accountName,
  accountIcon: state.createAccountReducer.accountIcon,
  accountIconId: state.userAccountReducer.accountIcon,
  address: state.keyReducer.publicKey,
  password: state.createAccountReducer.password,
  passwordHint: state.createAccountReducer.passwordHint
});
const mapDispatchToProps = dispatch => ({
  setMasterKey: key => {
    dispatch({ type: KeyAction.MASTER_KEY, key });
  },
  setPublicKey: key => {
    dispatch({ type: KeyAction.PUBLIC_KEY, key });
  },
  setKeys: (masterKey, publicKey, privateKey) => {
    dispatch({
      type: KeyAction.MASTER_PUBLIC_PRIVATE_KEY,
      masterKey,
      publicKey,
      privateKey
    });
  },
  setMnemonicCode: mnemonic => {
    dispatch({ type: KeyAction.MNEMONIC_CODE, mnemonic });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
