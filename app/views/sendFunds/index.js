import React, {Component} from 'react';
import { Button } from 'reactstrap'

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
        this.setState({
            isCheckSend: true
        })
    }

    handleGoBack(){
        this.setState({
            isCheckSend: false
        })
    }

    render(){
        const {address, accountType, ftmAmount, usdAmount, optionalMessage, isCheckSend} = this.state;
        return(
            <div style={{width: 500, backgroundColor: '#fff' ,
             alignSelf: 'center', marginLeft: '100px', marginTop: '100px', border: '2px solid black', padding: '20px' }}>
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
                <p>0.000226 USD ($0.06)</p>

                <p>Total</p>
                <p>0.402926 USD ($100.06)</p>
                <Button color="primary" onClick={this.handleCheckSend.bind(this)}>CONTINUE</Button>
                <Button color ="primary" onClick={() => this.props.onClose()} >CLOSE</Button>
            </div> :
                <CheckSend handleGoBack={this.handleGoBack.bind(this)}/>
            }
            </div>
        )
    }
}

