import React, { Component } from 'react';
import WalletSetup from '../walletSetup/index';
import AccountManagement from '../accountManagement/index';

class MainPage extends Component{
    state={
        isUnlock:false
    }
    onUnlockAccount(){
        this.setState({
            isUnlock:true
        })
    }
    setAmountData(name,id,address){
        this.setState({
            name:name,
            id:id,
            address:address
        })
    }
    render(){
        return(
                <div>
                   { !this.state.isUnlock ? <WalletSetup onUnlockAccount={this.onUnlockAccount.bind(this)} setAmountData={this.setAmountData.bind(this)}/>:<AccountManagement name={this.state.name} id={this.state.id} address={this.state.address}/>}
                    </div>
        );
    }
}
export default MainPage;