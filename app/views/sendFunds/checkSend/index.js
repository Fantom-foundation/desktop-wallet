import React, { Component } from 'react';
import { Button } from 'reactstrap'
import TextField from './textField'

export default class SendMoney extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coin: '089.00FTM',
    }
  }

  render() {

    return (
      <div >
        <div >
          <div >
            <TextField
              textinputStyle={{ width: 300 }}
              isTextPresent={true}
              rightTextValue={this.state.coin}
              placeHolderText={'Coin'}
            />
          </div>
          <div >
            <TextField
              placeHolderText={'Address to send'}
              isTextPresent={true}
              rightTextValue={'address'}
            />
          </div>
          <div >
            <TextField
              placeHolderText={'Price'}
              isTextPresent={true}
              rightTextValue={'amount'}
            />
          </div>
          <div >
            <TextField
              placeHolderText={'Fees'}
              isTextPresent={true}
              rightTextValue={'fees'}
            />
          </div>
          <div >
            <TextField
              placeHolderText={'Memo'}
              textinputStyle={{ width: 300 }}
              isTextPresent={true}
              rightTextValue={'memo'}
            />
          </div>
          <p >
            Please check if the above information is correct.
          </p>
          <div  />
        </div>
        <div >

            <Button color="primary" >CONTINUE</Button>
            <div style={{margin: '10px'}}/>
            <Button color="primary" onClick={() => this.props.handleGoBack()}>BACK</Button>
        </div>
      </div>
    );
  }
}

