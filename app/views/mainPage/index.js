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

    render(){
        return(
                <div>
                   { !this.state.isUnlock ? <WalletSetup onUnlockAccount={this.onUnlockAccount.bind(this)}/>:<AccountManagement/>}
                    </div>
        );
    }
}
export default MainPage;