import React, { Component } from 'react';
import { DropdownItem } from 'reactstrap';

import SelectDropDown from './selectDropDown';
/**
 * AccountList: This component is meant for rendering list of valid account in ' Withrom From ' type field in send funds screen.
 * User can select the account from which to transfer funds, selected account name is rendered in ' Withrom From ' field.
 */
class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountStore: this.props.accountStore || [],
      accountType: this.props.accountType
    };
  }

  componentWillReceiveProps(nextProps) {
    const { accountStore, accountType } = nextProps;
    this.setState({
      accountStore,
      accountType
    });
  }

  setAccountType = e => {
    this.setState({
      accountType: e.target.innerText
    });
    const { setAccountType } = this.props;
    if (setAccountType) {
      setAccountType(e);
    }
  };

  renderAccountList() {
    const { accountStore, accountType } = this.state;
    const accountDetailList = [];
    const length = accountStore.length;
    let accountName = '';
    for (let account = 0; account < length; account += 1) {
      if (accountType === accountStore[account].name) {
        accountName = accountStore[account].name;
      }
      accountDetailList.push(
        <DropdownItem onClick={this.setAccountType} key={account}>
          {accountStore[account].name}
        </DropdownItem>
      );
    }
    return { accountDetailList, accountName };
  }

  render() {
    const renderList = this.renderAccountList();
    return (
      <React.Fragment>
        <SelectDropDown
          value={renderList.accountName}
          accountDetailList={renderList.accountDetailList}
          maxFantomBalance={this.props.maxFantomBalance}
        />
      </React.Fragment>
    );
  }
}
export default AccountList;
