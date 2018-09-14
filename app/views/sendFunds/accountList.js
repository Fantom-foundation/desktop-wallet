import React, { Component } from 'react';
import { Input } from 'reactstrap';

 class AcoountList extends Component {
  
setAccountType(e){
    const { setAccountType } = this.props;
    if(setAccountType){
        setAccountType(e);
    }
}

renderAccountList(){
  const { accountStore } = this.props;
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
export default AcoountList;
