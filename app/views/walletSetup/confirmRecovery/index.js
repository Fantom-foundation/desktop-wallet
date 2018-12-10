import React, { Component } from 'react';
import { Row, Col, Button, Container } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import AccountCreationCancelModal from '../../../general/modal/accountCreationCancelModal/index';
import IncorrectMnemonicsModal from '../../../general/modal/incorrect-mnemonics/index';

class ConfirmRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLocked: true,
      modal: false,
      selectedMnemonicsArray: [],
      mnemonicsArray: [],
      openIncorrectMnemonicsModal: false,
      isRefreshing: false
    };
    this.selectMnemonic = this.selectMnemonic.bind(this);
    this.getMnemonics = this.getMnemonics.bind(this);
    this.getSelectedMnemonics = this.getSelectedMnemonics.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleIncorrectMnemonicsModal = this.toggleIncorrectMnemonicsModal.bind(
      this
    );
    this.onRefresh = this.onRefresh.bind(this);
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

  onUnlock() {
    const { onUnlockAccount, privateKey, password, mnemonic } = this.props;
    const { selectedMnemonicsArray } = this.state;

    const mnemonicArr = selectedMnemonicsArray.map(val => val.name);
    if (mnemonicArr.join(' ') !== mnemonic) {
      this.toggleIncorrectMnemonicsModal();
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

  unselectMnemonic(name, index) {
    const SELF = this;

    const { selectedMnemonicsArray } = SELF.state;
    const clonedArray = selectedMnemonicsArray.slice();

    const selectedIndex = _.findIndex(
      selectedMnemonicsArray,
      mnemonicName => mnemonicName.index === index
    );
    // eslint-disable-next-line no-undef
    const findSelectedMnemonic = document.getElementsByClassName(
      `${name}_${index}`
    );

    const hasSelectedClass = findSelectedMnemonic[0].classList.contains(
      'selected'
    );
    if (hasSelectedClass) {
      findSelectedMnemonic[0].classList.remove('selected');
      clonedArray.splice(selectedIndex, 1);
      SELF.setState({
        selectedMnemonicsArray: clonedArray
      });
    }
  }

  getMnemonics() {
    const SELF = this;
    const { mnemonic } = SELF.props;
    const { selectedMnemonicsArray } = SELF.state;
    let mnemonicsList = [];
    const generatedMnemonic = mnemonic ? mnemonic.split(' ') : mnemonic;
    if (generatedMnemonic && generatedMnemonic.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < generatedMnemonic.length; i += 1) {
        const selectedIndex = _.findIndex(
          selectedMnemonicsArray,
          mnemonicName => mnemonicName === generatedMnemonic[i]
        );
        mnemonicsList.push(
          <li
            key={`${i}_${generatedMnemonic[i]}`}
            className={`${generatedMnemonic[i]}_${i}`}
          >
            <Button
              color="primary"
              disabled={selectedIndex !== -1}
              onClick={() => SELF.selectMnemonic(generatedMnemonic[i], i)}
            >
              {generatedMnemonic[i]}
            </Button>
          </li>
        );
      }
    }
    mnemonicsList = _.shuffle(mnemonicsList);

    return mnemonicsList;
  }

  selectMnemonic(name, index) {
    const SELF = this;
    const { selectedMnemonicsArray } = SELF.state;
    const clonedArray = selectedMnemonicsArray.slice();

    // eslint-disable-next-line no-undef
    const findSelectedMnemonic = document.getElementsByClassName(
      `${name}_${index}`
    );
    const hasSelectedClass = findSelectedMnemonic[0].classList.contains(
      'selected'
    );
    if (!hasSelectedClass) {
      findSelectedMnemonic[0].classList.add('selected');
      clonedArray.push({ name, index });
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
      for (let i = 0; i < selectedMnemonicsArray.length; i += 1) {
        mnemonicsList.push(
          <li key={`${i}_${selectedMnemonicsArray[i]}`}>
            <Button
              color="primary"
              onClick={() =>
                SELF.unselectMnemonic(
                  selectedMnemonicsArray[i].name,
                  selectedMnemonicsArray[i].index
                )
              }
            >
              {selectedMnemonicsArray[i].name}
            </Button>
          </li>
        );
      }
    }

    return mnemonicsList;
  }

  /**
   * @method onRefresh : To reset state of mnemonic pharse holder.
   */
  onRefresh() {
    this.setState({
      isRefreshing: true
    });

    const SELF = this;
    const { mnemonic } = SELF.props;
    const generatedMnemonic = mnemonic ? mnemonic.split(' ') : mnemonic;

    const mnemonics = this.getMnemonics();
    const mnemonicsLength = generatedMnemonic.length;
    if (generatedMnemonic && mnemonicsLength) {
      for (let i = 0; i < mnemonicsLength; i += 1) {
        const findSelectedMnemonic = document.getElementsByClassName(
          `${generatedMnemonic[i]}_${i}`
        );

        const hasSelectedClass = findSelectedMnemonic[0].classList.contains(
          'selected'
        );
        if (hasSelectedClass) {
          findSelectedMnemonic[0].classList.remove('selected');
        }
      }
    }
    this.setState({
      mnemonicsArray: mnemonics,
      selectedMnemonicsArray: []
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 1000);
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
    const { activeTab, mnemonic } = this.props;
    console.log('mnemonic', mnemonic);

    const {
      mnemonicsArray,
      openIncorrectMnemonicsModal,
      isRefreshing
    } = this.state;
    const selectedMnemonics = this.getSelectedMnemonics();

    let rotate = '';
    if (isRefreshing) {
      rotate = 'rotate';
    }
    if (activeTab !== '3') {
      return null;
    }
    return (
      <React.Fragment>
        <section className="bg-dark">
          <Container>
            {/* <Row>
              <Col className="px-0">
                <div className="add-wallet">
                  <h2 className="title ">
                    <span>Enter Your Mnemonic</span>
                  </h2>
                  <Button onClick={this.onRefresh}>
                    <i className={`fas fa-sync-alt ${rotate}`} />
                  </Button>
                </div>
              </Col>
            </Row> */}

            <Row>
              <Col>
                <div id="mnemonic-selector">
                  <h2 className="text-white">
                    Enter your mnemonics in the correct order to create your
                    account below
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
            {this.renderCancelAccountCreationModal()}
            <IncorrectMnemonicsModal
              openIncorrectMnemonicsModal={openIncorrectMnemonicsModal}
              toggleIncorrectMnemonicsModal={this.toggleIncorrectMnemonicsModal}
            />
          </Container>
        </section>
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
