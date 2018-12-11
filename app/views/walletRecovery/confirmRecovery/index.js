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
        isLocked: true
      });
      return;
    }
    this.setState({
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

    this.setState({
      openIncorrectMnemonicsModal: !openIncorrectMnemonicsModal
    });
  }

  render() {
    const { activeTab } = this.props;
    const { mnemonicPhrase, openIncorrectMnemonicsModal } = this.state;
    if (activeTab !== '2') {
      return null;
    }

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
