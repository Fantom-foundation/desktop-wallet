import React, { Component } from 'react';
import { Input } from 'reactstrap';

 class AccountList extends Component {
     constructor(props){
         super(props);
         this.state = {
            accountStore: [],
         }
     }
  
setAccountType(e){
    const { setAccountType } = this.props;
    if(setAccountType){
        setAccountType(e);
    }
}

componentWillReceiveProps(nextProps){
    const { accountStore } = nextProps;
    this.setState({
        accountStore,
    })
}

renderAccountList(){
  const { accountStore } = this.state;
  const accountDetailLsit = [];
  const length = accountStore.length;
  for(let account = 0;  account < length; account++){
    accountDetailLsit.push(<option key={account}>{accountStore[account].name}</option>)
  }
  return accountDetailLsit;
}

render() {
    return (
        <Input type="select" name="select" id="accountSelect" onChange={this.setAccountType.bind(this)}>
        {this.renderAccountList()}
        </Input>

    );
  }
}
export default AccountList;
