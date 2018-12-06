import React, { Component } from 'react';
import { Row, Button, Col } from 'reactstrap';

import AccountCard from '../accountCard/index';
import Store from '../../../store/userInfoStore/index';

/**
 * UserAccounts :  This component is meant for rendering list of valid accounts in wallet, in file on system.
 * storeKeys: It contains list of public keys for valid accounts in file.
 */
class UserAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccountStore: Store.store
      // storeKeys: props.storeKeys
    };
  }

  componentWillReceiveProps() {
    const { storeKeys } = this.props;
    const userAccountStore = Store.store;
    if (storeKeys.length > 0) {
      this.setState({
        userAccountStore
        // storeKeys
      });
    }
  }

  renderAccountCard() {
    const { userAccountStore } = this.state;
    const {
      handleSelectedAccount,
      copyToClipboard,
      storeKeys = []
    } = this.props;
    let account = '';
    const accountList = [];

    if (storeKeys) {
      for (const key of storeKeys) {
        // if (key !== this.props.address) {
        account = (
          <AccountCard
            key={`${key}`}
            accountInfo={userAccountStore[key]}
            handleSelectedAccount={handleSelectedAccount}
            copyToClipboard={copyToClipboard}
          />
        );

        accountList.push(account);
        // }
      }
      return accountList;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row id="account-card" className="text-center ">
          {this.renderAccountCard()}
        </Row>
      </React.Fragment>
    );
  }
}

export default UserAccounts;
