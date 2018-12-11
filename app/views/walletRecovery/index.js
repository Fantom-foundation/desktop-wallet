// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../general/header/index';
import CreateAccount from './createAccount/index';
import ConfirmRecovery from './confirmRecovery/index';
import CreateAccountSteps from '../createAccountSteps/index';
import * as KeyAction from '../../reducers/keys/action';

/**
 * Screen to  recover wallet.
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      // progressValue: 50,
      date: new Date().getTime(),
      isOpenSetting: false,
      nextButtonDisable: true
    };
    this.toggle = this.toggle.bind(this);
  }

  /**
   * toggle() : To toggle the account step number.
   * @param {*} tab : Set selected tab number.
   */
  toggle(tab, visited) {
    let nextButtonDisable = true;
    if (visited) {
      nextButtonDisable = false;
    } else {
      nextButtonDisable = true;
    }
    this.setState({
      activeTab: tab,
      nextButtonDisable
    });
  }

  /**
   * onRefresh() : To refresh the identicon list.
   */
  onRefresh = () => {
    const newDate = new Date().getTime();
    this.setState({ date: newDate });
  };

  /**
   * onUnlockAccount() :  This is meant for unlocking the  account .
   */
  onUnlockAccount(isUnlock, privateKey, password, address) {
    if (this.props.onUnlockAccount) {
      this.props.onUnlockAccount(isUnlock, privateKey, password);
    }
    if (this.props.setAmountData) {
      const { accountIcon, accountName } = this.props;
      this.props.setAmountData(accountName, accountIcon, address);
    }
  }

  openAccountManagement() {
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

  handleUserSettings() {
    const { handleUserSettings } = this.props;
    if (handleUserSettings) {
      handleUserSettings();
      this.setState({
        isOpenSetting: false
      });
    }
  }

  changeDisableButtons = () => {
    const { activeTab } = this.state;
    let nextButtonDisable = true;
    if (activeTab === '1') {
      const accountRefInstance = this.accountRef.wrappedInstance;
      nextButtonDisable = accountRefInstance.isNextButtonDisable();
    }
    if (activeTab === '2') {
      nextButtonDisable = true;
    }
    this.setState({
      nextButtonDisable
    });
  };

  onNext = () => {
    const { activeTab } = this.state;

    if (activeTab === '1') {
      this.accountRef.wrappedInstance.onNext();
    }
    //  else if (activeTab === '2') {
    //   this.accountInfoRef.wrappedInstance.onNext();
    // }
  };

  onPrev = () => {
    const { activeTab } = this.state;
    if (activeTab === '2') {
      this.toggle('1', 'visited');
    }
  };

  backButtonDisable = () => {
    const { activeTab } = this.state;
    if (activeTab === '1') {
      return true;
    }
    if (activeTab === '2') {
      return false;
    }
  };

  render() {
    const { isOpenSetting, activeTab, nextButtonDisable } = this.state;
    const {
      accountIconId,
      loading,
      accountName,
      password,
      passwordHint
    } = this.props;
    const isRestoreAccount = true;
    const backButtonDisable = this.backButtonDisable();
    return (
      <div>
        <Header
          accountIcon={accountIconId}
          isWalletSetup
          handleUserSettings={this.handleUserSettings.bind(this)}
          openAccountManagement={() => this.openAccountManagement()}
          openAccount={() => this.openAccountManagement()}
          handleSettings={this.handleSettings.bind(this)}
          isOpenSetting={isOpenSetting}
        />
        <CreateAccountSteps
          onNext={this.onNext}
          onPrev={this.onPrev}
          stepNo={activeTab}
          restoreAccount={isRestoreAccount}
          backButtonDisable={backButtonDisable}
          nextButtonDisable={nextButtonDisable}
        >
          {activeTab === '1' ? (
            <CreateAccount
              ref={component => {
                this.accountRef = component;
              }}
              activeTab={this.state.activeTab}
              date={this.state.date}
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
            <ConfirmRecovery
              ref={component => {
                this.confirmRecoveryRef = component;
              }}
              isWaiting={loading}
              activeTab={this.state.activeTab}
              toggle={this.toggle.bind(this)}
              onUnlockAccount={this.onUnlockAccount.bind(this)}
              openAccountManagement={this.openAccountManagement.bind(this)}
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
