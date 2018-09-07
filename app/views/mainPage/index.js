import React, { Component } from 'react';
import WalletSetup from '../walletSetup/index';
import AccountManagement from '../accountManagement/index';

import SendFunds from '../sendFunds/index';

class MainPage extends Component{
    state={
        isUnlock:false,
        isSendFund: false,
    }
    onUnlockAccount(){
        this.setState({
            isUnlock:true
        })
    }

    handleSendFunds(){
        this.setState({
            isSendFund: true,
        })
    }

    onClose(){
        this.setState({
            isSendFund: false,
        })
    }

    render(){
        const publicKey = '';
        const privateKey = '';
        return(
                <div>
                   { !this.state.isUnlock ? <WalletSetup onUnlockAccount={this.onUnlockAccount.bind(this)}/>:<AccountManagement handleSendFunds={this.handleSendFunds.bind(this)}/>}
                    {this.state.isSendFund &&  <SendFunds onClose={this.onClose.bind(this)} privateKey={privateKey} publicKey={publicKey}/>}
                    </div>
        );
    }
}
export default MainPage;