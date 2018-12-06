import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
// import TextField from './textField';
import warningImg from './warning.svg';
import TransactionStore from '../../../store/transactionStore';
import { transferMoney } from './transfer';
import addressImage from '../../../images/addressDisable.svg';
import coinImage from '../../../images/coin.svg';
// import memoImage from '../../../images/memo.svg';
import fantomLogo from '../../../images/Logo/small-logo-white.svg';

/**
 * SendMoney: This component is meant for rendering modal for Check send.
 */
export default class SendMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: 'FTM',
      errorMessage: ''
    };
  }

  /**
   * transferMoney() :  This function is meant for sending funds to some wallet account.
   * @param {*} from : Address of account from which to transfer.
   * @param {*} to : Address of account to whom to transfer.
   * @param {*} value : Amount to be transfered.
   * @param {*} memo : : Message text for transaction.
   * @param {*} privateKey : Private key of account from which to transfer.
   *
   * If the transfer done successfully then , modal is closed and wallet balance and transaction details is updated.
   */
  transferMoney(from, to, value, memo, privateKey) {
    const { handleModalClose, refreshWalletDetail } = this.props;
    transferMoney(from, to, value, memo, privateKey)
      .then(data => {
        if (data.hash && data.hash !== '') {
          this.addTransactionLocally(value, from, to, data.hash, false);
          console.log(
            `Transfer successful with transaction hash: ${data.hash}`
          );
          if (handleModalClose) {
            handleModalClose();
          }
          setTimeout(() => {
            if (refreshWalletDetail) {
              refreshWalletDetail(from, to);
            }
          }, 1000);

          return;
        }
        console.log(`Transfer successful.`);

        return true;
      })
      .catch(err => {
        const message =
          err.message || 'Invalid error. Please check the data and try again.';
        console.log(`Transfer error message: `, message);
        this.addTransactionLocally(value, from, to, '', true);
        this.setState({ errorMessage: message });
      });
  }

  addTransactionLocally(amount, from, to, hash, isError) {
    const data = {
      type: 'SENT',
      amount,
      transactionId: '',
      time: new Date().getTime(),
      amountUnit: 'FTM',
      from,
      to,
      isError,
      hash
    };

    const key = 'Transactions';
    const newObj = TransactionStore.get(key);
    const objArr = newObj || [];
    objArr.push(data);
    TransactionStore.set(key, objArr);
  }

  /**
   * confirmSendFunds() :  A function for transfering funds on click on continue.
   */
  confirmSendFunds() {
    const { publicKey, address, amount, memo, privateKey } = this.props;
    this.transferMoney(publicKey, address, amount, memo, privateKey);
  }

  render() {
    const { address, amount, memo } = this.props;
    const { errorMessage, coin } = this.state;
    return (
      <React.Fragment>
        <div id="transaction-form">
          <div>
            <h2 className="text-white text-center text-uppercase heading">
              <span>CONFIRM</span>
            </h2>
            <div className="add-wallet">
              <h2 className="title">
                <span>Send Funds - Confirm</span>
              </h2>
              <Button className="btn">
                <i className="fas fa-sync-alt" />
              </Button>
            </div>

            <div className="form">
              {/* <TextField
                isTextPresent
                rightTextValue={coin}
                placeHolderText="Coin"
              /> */}
              <FormGroup>
                <Label for="to-address">Coin</Label>
                <div className="success-check success">
                  {' '}
                  {/* add or remove --- success --- class  */}
                  <Input
                    type="text"
                    id="to-address"
                    placeholder="Coin"
                    style={{
                      backgroundImage: `url(${coinImage})`
                    }}
                    value={coin}
                    readOnly
                  />
                  {/* <img src={successCheck} alt={successCheck} /> */}
                </div>
              </FormGroup>
              <Row className="change">
                <Col>
                  <FormGroup>
                    <Label for="Amount">Address to send</Label>
                    <div className="input-holder">
                      <Input
                        type="text"
                        id="to-address"
                        placeholder="Address"
                        style={{
                          backgroundImage: `url(${addressImage})`
                        }}
                        value={address}
                        readOnly
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              {/* <TextField
                placeHolderText="Address to send"
                isTextPresent
                rightTextValue={address}
              /> */}

              {/* <TextField
                placeHolderText="Number of coin"
                isTextPresent
                rightTextValue={amount}
              /> */}
              <FormGroup>
                <Label for="to-address">Price</Label>
                <div className="success-check success">
                  {' '}
                  {/* add or remove --- success --- class  */}
                  <Input
                    type="text"
                    id="to-address"
                    placeholder="Amount"
                    style={{
                      backgroundImage: `url(${fantomLogo})`
                    }}
                    value={amount}
                    readOnly
                  />
                  {/* <img src={successCheck} alt={successCheck} /> */}
                </div>
              </FormGroup>
              {/* <TextField
                placeHolderText="Memo"
                isTextPresent
                rightTextValue={memo}
              /> */}
              <Label for="OptionalMessage">Memo</Label>
              <FormGroup className="mb-1">
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  placeholder="Text..."
                  // style={{
                  //   backgroundImage: `url(${memoImage})`
                  // }}
                  value={memo}
                  readOnly
                />
              </FormGroup>
              <br />
              <div className="warning-msg mt-3">
                <img src={warningImg} alt="warning" />
                <h2>Attention</h2>
                <p>Please make sure the above information is correct.</p>
              </div>

              <center>
                <div>
                  <Button
                    color="primary"
                    className="text-uppercase bordered "
                    style={{ marginTop: '18px' }}
                    onClick={() => this.confirmSendFunds()}
                  >
                    Continue
                  </Button>
                </div>
                <div>
                  <Button
                    color="primary"
                    className="text-uppercase bordered "
                    style={{ marginTop: '18px' }}
                    onClick={() => this.props.handleGoBack()}
                  >
                    Back
                  </Button>
                </div>
              </center>
              {errorMessage !== '' && (
                <p style={{ color: 'red' }}>Funds transfer unsuccessful!</p>
              )}
              {/* <p
            aria-hidden
            className="text-center mt-3"
            onClick={() => this.props.handleGoBack()}
          >
            <span
              style={{
                cursor: 'pointer',
                fontSize: '12px',
                fontFamily: 'SFCompactDisplay',
                fontWeight: 'bold',
                color: '#00b1ff',
                textDecoration: 'underline'
              }}
            >
              <span>BACK</span>
            </span>
          </p> */}
              <hr
                style={{
                  borderStyle: 'dashed',
                  borderColor: '#707070',
                  opacity: 0.33,
                  marginBottom: '14px'
                }}
              />
              <p className="error-msg">
                Please check if the above information is correct.
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
