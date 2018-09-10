import React, {Component} from 'react';
import { Button, Alert, Modal } from 'reactstrap';
import Web3 from 'web3';

import CheckSend from './checkSend/index';

export default class SendFunds extends Component {
    constructor(props){
        super(props);
        this.state= {
            address: '',
            accountType: 'Fantom Wallet',
            ftmAmount: '',
            usdAmount:'',
            optionalMessage: '',
            networkFees: 0.000226,
            totalFees: 0.402926,
            isCheckSend: false,
            
        }
    }

    setAddress(e){
        const address = e.target.value.trim();
        this.setState({
            address,
        })
    }

    setAccountType(e){
        const accountType = e.target.value.trim();
        this.setState({
            accountType,
        })
    }

    setFTMAmount(e){
        const ftmAmount = e.target.value.trim();
        this.setState({
            ftmAmount,
        })
    }   

    setUSDAmount(e){
        const usdAmount = e.target.value.trim();
        this.setState({
            usdAmount,
        }) 
    }

    setMessage(e){
        const optionalMessage = e.target.value.trim();
        this.setState({
            optionalMessage,
        }) 
    }

    handleCheckSend(){
        this.handleSendMoney()
    }

    handleGoBack(){
        this.setState({
            isCheckSend: false
        })
    }

    /**
   *  handleSendMoney()  : This function is meant for handling input box validations ,
   *  and navigate to CheckSend screen if all fields are filled.
   */
  handleSendMoney() {
    const { address, ftmAmount,} = this.state;

    let message = '';
    if (address === '') {
      message = 'Please enter address.';
    } else if (!Web3.utils.isAddress(address)) {
      message = 'Please enter valid address.';
    } else if (ftmAmount === '') {
      message = 'Please enter valid amount';
    }

    if (message !== '') {
        return;
    }
    this.setState({
        isCheckSend: true
    })
  }

    render(){
        const {address, accountType, ftmAmount, usdAmount, optionalMessage, networkFees, totalFees, isCheckSend} = this.state;
        const {publicKey, privateKey} = this.props;
        return(
            <Modal isOpen={true}>
            <div style={{backgroundColor: '#fff' ,
             alignSelf: 'center', border: '2px solid black',  }}>
            {!isCheckSend ?  <div>
                <h1>Send Funds</h1>
                <p>To Address</p>
                <input 
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={this.setAddress.bind(this)} />

                <p>Withdraw from</p>
                <input 
                type='text'
                placeholder='Fantom Wallet'
                value={accountType}
                disabled
                onChange={this.setAccountType.bind(this)} />

                <p>Amount</p>
                <input 
                type='text'
                value={ftmAmount}
                onChange={this.setFTMAmount.bind(this)} />

                <input 
                type='text'
                value={usdAmount}
                onChange={this.setUSDAmount.bind(this)} />

                <p>Note</p>
                <input 
                type='text'
                placeholder='Optional Message'
                value={optionalMessage}
                onChange={this.setMessage.bind(this)} />

                <p>Network fee</p>
                <p>{networkFees} USD ($0.06)</p>

                <p>Total</p>
                <p>{totalFees} USD ($100.06)</p>
                <Button color="primary" onClick={this.handleCheckSend.bind(this)}>CONTINUE</Button>
                <Button color ="primary" onClick={() => this.props.onClose()} >CLOSE</Button>
            </div> :
                <CheckSend 
                handleGoBack={this.handleGoBack.bind(this)}
                address={address}
                amount={ftmAmount} 
                coin={accountType}
                memo={optionalMessage || 'none'}
                fees= {networkFees}
                publicKey={publicKey}
                privateKey={privateKey}
                // reload={ this.reload.bind(this)}
                />
            }
            </div>
            </Modal>
        )
    }
}

