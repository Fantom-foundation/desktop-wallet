import React, { Component } from 'react';
import { Input } from 'reactstrap';
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

  setAccountType(e) {
    this.setState({
      accountType: e.target.value
    });
    const { setAccountType } = this.props;
    if (setAccountType) {
      setAccountType(e);
    }
  }

  renderAccountList() {
    const { accountStore, accountType } = this.state;
    const accountDetailList = [];
    const length = accountStore.length;
    for (let account = 0; account < length; account += 1) {
      let selected = false;
      if (accountType === accountStore[account].name) {
        selected = true;
      }
      accountDetailList.push(
        <option key={account} selected={selected}>
          {accountStore[account].name}
        </option>
      );
    }
    return accountDetailList;
  }

  render() {
    return (
      <Input
        type="select"
        name="select"
        id="accountSelect"
        onChange={this.setAccountType.bind(this)}
      >
        {this.renderAccountList()}
      </Input>
    );
  }
}
export default AccountList;
