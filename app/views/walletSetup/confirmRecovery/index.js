import React, { Component } from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import AccountCreationCancelModal from './accountCreationCancelModal/index';

class ConfirmRecovery extends Component {
  // onBack(){
  //   if(this.props.toggle){
  //       this.props.toggle('2');
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {
      // isLocked: true,
      modal: false,
      selectedMnemonicsArray: [],
      mnemonicsArray: []
    };
    this.selectMnemonic = this.selectMnemonic.bind(this);
    this.getMnemonics = this.getMnemonics.bind(this);
    this.getSelectedMnemonics = this.getSelectedMnemonics.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    const mnemonics = this.getMnemonics();
    this.setState({
      mnemonicsArray: mnemonics
    });
  }

  toggle() {
    const { isWaiting } = this.props;
    const { modal } = this.state;
    if (isWaiting) {
      return null;
    }

    this.setState({
      modal: !modal
    });
  }

  // inputHandler = e => {
  //   const { mnemonic } = this.props;
  //   if (mnemonic === e.target.value) {
  //     this.setState({
  //       isLocked: false
  //     });
  //   } else {
  //     this.setState({
  //       isLocked: true
  //     });
  //     console.log('not matched');
  //   }
  // };

  onUnlock() {
    const { onUnlockAccount, privateKey, password, mnemonic } = this.props;
    const { selectedMnemonicsArray } = this.state;
    if (selectedMnemonicsArray.join(' ') !== mnemonic) {
      return;
    }

    onUnlockAccount(true, privateKey, password);
  }

  renderCancelAccountCreationModal() {
    const { openAccountManagement } = this.props;
    const { modal } = this.state;
    return (
      <AccountCreationCancelModal
        toggle={() => this.toggle()}
        modal={modal}
        openAccountManagement={openAccountManagement}
      />
    );
  }

  unselectMnemonic(name) {
    const SELF = this;
    const { mnemonic } = this.props;
    const { selectedMnemonicsArray } = SELF.state;
    const clonedArray = selectedMnemonicsArray.slice();
    const index = _.findIndex(
      mnemonic.split(' '),
      mnemonicName => mnemonicName === name
    );
    const selectedIndex = _.findIndex(
      selectedMnemonicsArray,
      mnemonicName => mnemonicName === name
    );
    // eslint-disable-next-line no-undef
    const findSelectedMnemonic = document.getElementsByClassName(
      `${name}_${index}`
    );
    if (findSelectedMnemonic) {
      findSelectedMnemonic[0].classList.remove('selected');
    }
    clonedArray.splice(selectedIndex, 1);
    SELF.setState({
      selectedMnemonicsArray: clonedArray
    });
  }

  getMnemonics() {
    const SELF = this;
    const { mnemonic } = SELF.props;
    let mnemonicsList = [];
    const generatedMnemonic = mnemonic ? mnemonic.split(' ') : mnemonic;
    if (generatedMnemonic && generatedMnemonic.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const name of generatedMnemonic) {
        const index = _.findIndex(
          generatedMnemonic,
          mnemonicName => mnemonicName === name
        );
        mnemonicsList.push(
          <li className={`${name}_${index}`}>
            <Button color="primary" onClick={() => SELF.selectMnemonic(name)}>
              {name}
            </Button>
          </li>
        );
      }
    }
    mnemonicsList = _.shuffle(mnemonicsList);

    return mnemonicsList;
  }

  selectMnemonic(name) {
    const SELF = this;
    const { mnemonic } = SELF.props;
    const { selectedMnemonicsArray } = SELF.state;
    const clonedArray = selectedMnemonicsArray.slice();
    const index = _.findIndex(
      mnemonic.split(' '),
      mnemonicName => mnemonicName === name
    );
    const selectedIndex = _.findIndex(
      selectedMnemonicsArray,
      mnemonicName => mnemonicName === name
    );
    // eslint-disable-next-line no-undef
    const findSelectedMnemonic = document.getElementsByClassName(
      `${name}_${index}`
    );
    if (findSelectedMnemonic) {
      findSelectedMnemonic[0].classList.add('selected');
    }
    if (selectedIndex === -1) {
      clonedArray.push(name);
      SELF.setState({
        selectedMnemonicsArray: clonedArray
      });
    }
  }

  getSelectedMnemonics() {
    const SELF = this;
    const { selectedMnemonicsArray } = this.state;
    const mnemonicsList = [];
    if (selectedMnemonicsArray && selectedMnemonicsArray.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const name of selectedMnemonicsArray) {
        mnemonicsList.push(
          <li>
            <Button color="primary" onClick={() => SELF.unselectMnemonic(name)}>
              {name}
            </Button>
          </li>
        );
      }
    }

    return mnemonicsList;
  }

  render() {
    const { activeTab, mnemonic } = this.props;
    console.log('mnemonic', mnemonic);
    const { mnemonicsArray } = this.state;
    const selectedMnemonics = this.getSelectedMnemonics();
    // const { isLocked } = this.state;
    if (activeTab !== '3') {
      return null;
    }

    // let createWalletColor = 'gray';
    // if (isWaiting) {
    //   createWalletColor = 'gray';
    // } else if (isLocked) {
    //   createWalletColor = 'gray';
    // } else {
    //   createWalletColor = '#00b1ff';
    // }

    // let cancelBtnColor = '#00b1ff';
    // if (isWaiting) {
    //   cancelBtnColor = 'gray';
    // } else if (isLocked) {
    //   cancelBtnColor = '#00b1ff';
    // } else {
    //   cancelBtnColor = '#00b1ff';
    // }

    return (
      <React.Fragment>
        <section className="bg-dark">
          <Container>
            <Row>
              <Col className="px-0">
                <div className="add-wallet">
                  <h2 className="title ">
                    <span>Enter Your Mnemonic</span>
                  </h2>
                  <Button>
                    <i className="fas fa-sync-alt" />
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div id="mnemonic-selector">
                  <h2 className="text-white">
                    Enter Your Mnemonic to create your account below
                  </h2>
                  <Row className="bg-dark-light">
                    <Col>
                      <div className="mnemonic-container">
                        <ul>{selectedMnemonics}</ul>
                      </div>
                      <div className="mnemonic-selector">
                        <ul>{mnemonicsArray}</ul>
                      </div>
                    </Col>
                  </Row>
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
                </div>
              </Col>
            </Row>
          </Container>
          {/* <CancelWalletModal
            toggleModal={toggleModal}
            cancelModalToggle={this.cancelModalToggle}
            cancelWallet={this.cancelWallet}
          />
          <IncorrectMnemonicsModal
            openIncorrectMnemonicsModal={openIncorrectMnemonicsModal}
            toggleIncorrectMnemonicsModal={this.toggleIncorrectMnemonicsModal}
          /> */}
        </section>

        <Row>
          <Col sm="12" style={{ paddingTop: '52px', paddingBottom: '52px' }}>
            {/* <div className="cs-container forms-container theme-blue-shadow inner mb-4">
              <Row className="mx-0">
                <Col style={{ paddingTop: '46px', paddingBottom: '46px' }}>
                  <div className="m-auto" style={{ maxWidth: '488px' }}>
                    <Row>
                      <Col>
                        <h2 className="title large text-center black-text">
                          Enter Your Mnemonic
                        </h2>
                        <p className="text text-center black-text">
                          Enter your mnemonic to create your account below.
                        </p>
                        <p className="text text-center black-text">
                          Be sure to take into out spacings and note that it is
                          case sensitive.
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form>
                          <FormGroup>
                            <Input
                              type="textarea"
                              name="text"
                              id="exampleText"
                              placeholder="Enter Mnemonic Phras"
                              onChange={e => this.inputHandler(e)}
                            />
                          </FormGroup>
                          <center>
                            <button
                              type="button"
                              style={{
                                height: '30px',
                                width: '150px',
                                padding: '0px 32px',
                                fontFamily: 'SFCompactDisplay',
                                fontSize: '15px',
                                backgroundColor: `${createWalletColor}`,
                                border: '0px',
                                outline: '0px',
                                color: '#fff',
                                textAlign: 'center',
                                cursor: 'pointer'
                              }}
                              onClick={this.onUnlock.bind(this)}
                            >
                              Create Wallet
                            </button>
                          </center>
                          <br/>
                          <center>
                            <button
                              type="button"
                              style={{
                                width: '150px',
                                marginTop: '10px',
                                padding: '0px 32px',
                                fontFamily: 'SFCompactDisplay',
                                fontSize: '15px',
                                color: `${cancelBtnColor}`,
                                outline: '0px',
                                backgroundColor: 'white',
                                border: '0px',
                                textDecoration: 'underline',
                                textAlign: 'center',
                                cursor: 'pointer'
                              }}
                              onClick={() => this.toggle()}
                            >
                              Cancel
                            </button>
                          </center>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <FooterButtons
              onBack={this.onBack.bind(this)}
              isBackActive
            />
            </div> */}
          </Col>
          {this.renderCancelAccountCreationModal()}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mnemonic: state.keyReducer.mnemonic,
  privateKey: state.keyReducer.privateKey,
  password: state.createAccountReducer.password
  // previousAccountName: state.createAccountReducer.accountName,
  // newAccountName: state.userAccountReducer.accountName,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmRecovery);
