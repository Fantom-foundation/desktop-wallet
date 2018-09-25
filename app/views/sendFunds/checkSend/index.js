import React, { Component } from 'react';
import { Button } from 'reactstrap'
import TextField from './textField';

import { transferMoney } from './transfer';

export default class SendMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // coin: '089.00FTM',
            coin: 'FTM',
            errorMessage: '',
            isLoading: false,
        }
    }

    transferMoney(from, to, value, memo, privateKey) {
        const { handleModalClose, refreshWalletDetail }  = this.props;
        this.setState({ isLoading: true });
        transferMoney(from, to, value, memo, privateKey).then((data) => {
            if (data.hash && data.hash !== '') {
                this.setState({ isLoading: false });
                console.log(`Transfer successful with transaction hash: ${data.hash}`);
                if(handleModalClose){
                    handleModalClose();
                }
                setTimeout(() => {
                    console.log(' api refresh called after timeout : ',data.hash);
                    if(refreshWalletDetail){
                        refreshWalletDetail(from, to);
                    }
                }, 1000)
                
                this.setState({ isLoading: false });
                return;
            }
            console.log(`Transfer successful.`)
            
        }).catch((err) => {
            const message = err.message || 'Invalid error. Please check the data and try again.';
            console.log(`Transfer error message: `, message);
            this.setState({ isLoading: false, errorMessage: message });
        });
    };

    confirmSendFunds() {
        const { publicKey, address, amount, coin, memo, fees, privateKey,  } = this.props;
        this.transferMoney(publicKey, address, amount, memo, privateKey);
    }

    render() {
        const { address, amount, memo, fees, } = this.props;
        const { errorMessage, coin, isLoading } = this.state;
        return (
            <div >
                <div >
                    <div >
                        <TextField
                            isTextPresent
                            rightTextValue={coin}
                            placeHolderText='Coin' />
                    </div>
                    <div >
                        <TextField
                            placeHolderText='Address to send'
                            isTextPresent
                            rightTextValue={address} />
                    </div>
                    <div >
                        <TextField
                            placeHolderText='Price'
                            isTextPresent
                            rightTextValue={amount} />
                    </div>
                    {/* <div >
                        <TextField
                            placeHolderText={'Fees'}
                            isTextPresent={true}
                            rightTextValue={fees} />
                    </div> */}
                    <div >
                        <TextField
                            placeHolderText='Memo'
                            isTextPresent
                            rightTextValue={memo} />
                    </div>

                    <Button
                        color="primary" className="text-uppercase w-100"
                        style={{ marginTop: '18px' }} onClick={() => this.confirmSendFunds()}>Continue</Button>
                    {errorMessage !== '' && <p style={{ color: 'red' }}>Funds transfer unsuccessful!</p>}
                    <br /><br />

                    <p aria-hidden className="text-center" sty onClick={() => this.props.handleGoBack()}>
                        <span style={{cursor: 'pointer', fontSize: '12px', fontFamily: 'SFCompactDisplay', fontWeight: 'bold', color: '#00b1ff', textDecoration: 'underline'}}><span>BACK</span></span>
                    </p>
                    <hr style={{ borderStyle: 'dashed', borderColor: "#707070", opacity: .33, marginBottom: '14px' }} />
                    <p className="error-msg">Please check if the above information is correct.</p>
                    <div />
                </div>
                <div/>
            </div>
        );
    }
}

