// @flow
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Progress } from '../../general/core/index';
import Header from '../../general/header/index';
// import CreateAccountSteps from '../createAccountSteps/index';
import CreateAccount from './createAccount/index';
import ConfirmRecovery from './confirmRecovery/index';

import * as KeyAction from '../../reducers/keys/action';

/**
 * Screen to  recover wallet.
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      progressValue: 50,
      date: new Date().getTime(),
      isOpenSetting: false
    };
    this.toggle = this.toggle.bind(this);
  }

  /**
   * toggle() : To toggle the account step number.
   * @param {*} tab : Set selected tab number.
   */
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      let progressValue = 50;
      if (tab === '1') {
        progressValue = 50;
      } else if (tab === '2') {
        progressValue = 100;
      }
      this.setState({
        activeTab: tab,
        progressValue
      });
    }
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

  render() {
    const { isOpenSetting } = this.state;
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
          isWalletSetup
          handleUserSettings={this.handleUserSettings.bind(this)}
          openAccountManagement={() => this.openAccountManagement()}
          openAccount={() => this.openAccountManagement()}
          handleSettings={this.handleSettings.bind(this)}
          isOpenSetting={isOpenSetting}
        />
        <section style={{ padding: '12px 0px 10px 0px' }}>
          <Container>
            <Row>
              <Col className="px-0">
                <Nav tabs className="tab-full tab-theme text-center">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '1'
                      })}
                    >
                      Create account
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '2'
                      })}
                    >
                      Confirm
                    </NavLink>
                  </NavItem>
                </Nav>
                <Progress type="theme-blue" value={this.state.progressValue} />
              </Col>
            </Row>
            <Row>
              <Col>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <CreateAccount
                      activeTab={this.state.activeTab}
                      date={this.state.date}
                      accountName={accountName}
                      // accountIcon={accountIcon}
                      password={password}
                      passwordHint={passwordHint}
                      toggle={this.toggle.bind(this)}
                      onRefresh={this.onRefresh.bind(this)}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <ConfirmRecovery
                      isWaiting={loading}
                      activeTab={this.state.activeTab}
                      toggle={this.toggle.bind(this)}
                      onUnlockAccount={this.onUnlockAccount.bind(this)}
                      openAccountManagement={this.openAccountManagement.bind(
                        this
                      )}
                    />
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Container>
        </section>
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
