import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import Bip39 from 'bip39';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import { connect } from 'react-redux';
// import Loader from 'react-spinners';
// import FooterButtons from '../../../general/footer/footer-buttons';

import AccountCreationCancelModal from '../../../general/modal/accountCreationCancelModal/index';
import IncorrectMnemonicsModal from '../../../general/modal/incorrect-mnemonics/index';
import * as KeyAction from '../../../reducers/keys/action';

/**
 * ConfirmRecovery: This component is meant for confirming the account recover process.
 */
class ConfirmRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonicPhrase: '',
      isLocked: true,
      modal: false,
      openIncorrectMnemonicsModal: false
      // errorText: ''
    };
    this.toggle = this.toggle.bind(this);
    this.toggleIncorrectMnemonicsModal = this.toggleIncorrectMnemonicsModal.bind(
      this
    );
  }

  /**
   * isValidSeed() :  This function is meant to check that captcha entered by user is valid or not.
   *    If invalid then error message is displayed.
   */
  isValidSeed(mnemonic) {
    const mnemonicKey = mnemonic.split(' ');
    if (mnemonicKey.length === 12) {
      return true;
    }
    return false;
  }

  /**
   * handleRecoverWallet() :  this function is meant to generate the keys to recover wallet.
   * @param {*} mnemonic
   */
  handleRecoverWallet(mnemonic) {
    const newMnemonic = mnemonic.trim();
    if (!this.isValidSeed(newMnemonic)) {
      this.setState({
        // errorText: 'Invalid Mnemonics!!',
        isLocked: true
      });
      return;
    }
    this.setState({
      // errorText: '',
      isLocked: false
    });
    const seed = Bip39.mnemonicToSeed(newMnemonic); // creates seed buffer

    this.walletSetup(seed);
  }

  /**
   * walletSetup() : This function verifies the user and generates a unique masterPrivateKey for that user.
   *  Then navigate user to HomeScreen.
   */
  walletSetup(seed) {
    const root = Hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');

    const addrNode = root.derive("m/44'/60'/0'/0/0"); // line 1
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); //eslint-disable-line
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const address = EthUtil.toChecksumAddress(addr);
    const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    this.props.setKeys(masterPrivateKey, address, hexPrivateKey);

    const { onUnlockAccount, password } = this.props;
    if (onUnlockAccount) {
      onUnlockAccount(true, hexPrivateKey, password, address);
    }
  }

  onBack() {
    if (this.props.toggle) {
      this.setState({
        isLocked: true
      });
      this.props.toggle('1');
    }
  }

  toggle() {
    const { isWaiting } = this.props;
    if (isWaiting) {
      return null;
    }

    this.setState({
      modal: !this.state.modal
    });
  }

  inputHandler = e => {
    this.setState({
      mnemonicPhrase: e.target.value
      // errorText: ''
    });

    if (e.target.value !== '') {
      this.setState({
        isLocked: false
      });
    } else {
      this.setState({
        isLocked: true
      });
    }
  };

  onUnlock() {
    const { mnemonicPhrase } = this.state;

    const { isLocked } = this.state;
    if (isLocked) {
      this.toggleIncorrectMnemonicsModal();
      return;
    }
    if (mnemonicPhrase !== '') {
      this.handleRecoverWallet(mnemonicPhrase);
    }

    // onUnlockAccount(true, privateKey, password);
  }

  renderCancelAccountCreationModal() {
    const { openAccountManagement } = this.props;
    return (
      <AccountCreationCancelModal
        toggle={() => this.toggle()}
        modal={this.state.modal}
        openAccountManagement={openAccountManagement}
      />
    );
  }

  /**
   * This method will toggle the Incorrect Mnemonics modal
   */
  toggleIncorrectMnemonicsModal() {
    const { openIncorrectMnemonicsModal } = this.state;
    console.log('openIncorrectMnemonicsModal : ', openIncorrectMnemonicsModal);

    this.setState({
      openIncorrectMnemonicsModal: !openIncorrectMnemonicsModal
    });
  }

  render() {
    // const { activeTab, isWaiting } = this.props;
    // const { errorText, mnemonicPhrase } = this.state;
    const { activeTab } = this.props;
    const { mnemonicPhrase, openIncorrectMnemonicsModal } = this.state;
    if (activeTab !== '2') {
      return null;
    }

    // let createWalletColor = 'gray';
    // if (isWaiting) {
    //   createWalletColor = 'gray';
    // } else if (this.state.isLocked) {
    //   createWalletColor = 'gray';
    // } else {
    //   createWalletColor = '#00b1ff';
    // }

    // let cancelBtnColor = '#00b1ff';
    // if (isWaiting) {
    //   cancelBtnColor = 'gray';
    // } else if (this.state.isLocked) {
    //   cancelBtnColor = '#00b1ff';
    // } else {
    //   cancelBtnColor = '#00b1ff';
    // }

    return (
      <section className="bg-dark">
        <Container>
          <Row>
            <Col>
              <div className="restore-confirm">
                <div className="wallet-bar">
                  <h2 className="title">
                    <span>Restore Wallet</span>
                  </h2>
                </div>
                <div className="vault-container bg-dark-light">
                  {/* <input
                    type="text"
                    onChange={e => this.onUpdate('enteredMnemonic', e.currentTarget.value)}
                    value={enteredMnemonic}
                  /> */}
                  <FormGroup>
                    <Label for="wallet-seed">Wallet Seed</Label>
                    <Input
                      type="textarea"
                      name="wallet-seed"
                      id="wallet-seed"
                      placeholder="Separate each word with a single space"
                      onChange={e => this.inputHandler(e)}
                      value={mnemonicPhrase}
                    />
                  </FormGroup>
                  <div className="text-center">
                    <p className="text-white">
                      Enter your secret twelve word phrase here to restore your
                      vault.
                    </p>
                    <p className="text-danger">
                      Separate each word with a single space
                    </p>
                  </div>
                </div>
              </div>
              <div className="mnemonic-btn">
                <Button
                  className="create-wallet"
                  onClick={this.onUnlock.bind(this)}
                >
                  Create Wallet
                </Button>
                <Button className="cancel" onClick={() => this.toggle()}>
                  Cancel
                </Button>
              </div>
            </Col>
            {this.renderCancelAccountCreationModal()}
            <IncorrectMnemonicsModal
              openIncorrectMnemonicsModal={openIncorrectMnemonicsModal}
              toggleIncorrectMnemonicsModal={this.toggleIncorrectMnemonicsModal}
            />
          </Row>
        </Container>
      </section>

      // <Row>
      //   <Col sm="12" style={{ paddingTop: '52px', paddingBottom: '52px' }}>
      //     <div className="cs-container forms-container theme-blue-shadow inner mb-4">
      //       <Row className="mx-0">
      //         <Col style={{ paddingTop: '46px', paddingBottom: '46px' }}>
      //           <div className="m-auto" style={{ maxWidth: '488px' }}>
      //             <Row>
      //               <Col>
      //                 <Form>
      //                   <FormGroup>
      //                     <Input
      //                       type="textarea"
      //                       name="text"
      //                       id="exampleText"
      //                       placeholder="Enter Mnemonic Phrase"
      //                       onChange={e => this.inputHandler(e)}
      //                     />
      //                     {errorText !== '' && (
      //                       <small
      //                         style={{
      //                           fontFamily: 'Roboto',
      //                           fontSize: '14px',
      //                           color: 'red'
      //                         }}
      //                       >
      //                         {errorText}
      //                       </small>
      //                     )}
      //                   </FormGroup>
      //                   <center>
      //                     {!isWaiting && (
      //                       <button
      //                         type="button"
      //                         style={{
      //                           height: '30px',
      //                           // width: '150px',
      //                           padding: '0px 32px',
      //                           fontFamily: 'SFCompactDisplay',
      //                           fontSize: '15px',
      //                           backgroundColor: `${createWalletColor}`,
      //                           border: '0px',
      //                           outline: '0px',
      //                           color: '#fff',
      //                           textAlign: 'center',
      //                           cursor: 'pointer'
      //                         }}
      //                         onClick={this.onUnlock.bind(this)}
      //                       >
      //                         Recover Wallet
      //                       </button>
      //                     )}

      //                     {isWaiting && (
      //                       <button
      //                         type="button"
      //                         style={{
      //                           height: '30px',
      //                           // width: '150px',
      //                           padding: '0px 32px',
      //                           fontFamily: 'SFCompactDisplay',
      //                           fontSize: '15px',
      //                           backgroundColor: `transparent`,
      //                           border: '0px',
      //                           outline: '0px',
      //                           color: '#fff',
      //                           textAlign: 'center',
      //                           cursor: 'pointer'
      //                         }}
      //                         onClick={this.onUnlock.bind(this)}
      //                       >
      //                         Recover Wallet
      //                       </button>
      //                     )}
      //                   </center>
      //                   <center>
      //                     <button
      //                       type="button"
      //                       style={{
      //                         width: '150px',
      //                         marginTop: '10px',
      //                         padding: '0px 32px',
      //                         fontFamily: 'SFCompactDisplay',
      //                         fontSize: '15px',
      //                         color: `${cancelBtnColor}`,
      //                         outline: '0px',
      //                         backgroundColor: 'white',
      //                         border: '0px',
      //                         textDecoration: 'underline',
      //                         textAlign: 'center',
      //                         cursor: 'pointer'
      //                       }}
      //                       onClick={() => this.toggle()}
      //                     >
      //                       Cancel
      //                     </button>
      //                   </center>
      //                 </Form>
      //               </Col>
      //             </Row>
      //           </div>
      //         </Col>
      //       </Row>
      //       <FooterButtons onBack={this.onBack.bind(this)} isBackActive />
      //     </div>
      //   </Col>
      //   {this.renderCancelAccountCreationModal()}
      // </Row>
    );
  }
}

const mapStateToProps = state => ({
  password: state.createAccountReducer.password
});

const mapDispatchToProps = dispatch => ({
  setMasterKey: key => {
    dispatch({ type: KeyAction.MASTER_KEY, key });
  },
  setPublicKey: key => {
    dispatch({ type: KeyAction.PUBLIC_KEY, key });
  },
  setKeys: (masterKey, publicKey, privateKey) => {
    dispatch({
      type: KeyAction.MASTER_PUBLIC_PRIVATE_KEY,
      masterKey,
      publicKey,
      privateKey
    });
  },
  setMnemonicCode: mnemonic => {
    dispatch({ type: KeyAction.MNEMONIC_CODE, mnemonic });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(ConfirmRecovery);
