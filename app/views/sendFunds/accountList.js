import React, { Component } from 'react';
import { Input } from 'reactstrap';

 class AccountList extends Component {
     constructor(props){
         super(props);
         this.state = {
            accountStore: this.props.accountStore || [],
            accountType: this.props.accountType,
         }
     }
  
setAccountType(e){
    this.setState({
        accountType: e.target.value,
    })
    const { setAccountType } = this.props;
    if(setAccountType){
        setAccountType(e);
        
        
    }
}

componentWillReceiveProps(nextProps){
    const { accountStore, accountType } = nextProps;
    this.setState({
        accountStore,
        accountType,
    })
}

renderAccountList(){
  const { accountStore, accountType } = this.state;
  const accountDetailList = [];
  const length = accountStore.length;
  for(let account = 0;  account < length; account++){
      let selected = false;
      if(accountType === accountStore[account].name){

        selected = true;
      }
      accountDetailList.push(<option key={account} selected={selected}>{accountStore[account].name}</option>)
  }
  return accountDetailList;
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
