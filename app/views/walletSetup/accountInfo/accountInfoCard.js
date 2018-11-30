import React, { Component } from 'react';

import { Row, Col, Button } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import noView from '../../../images/icons/no-view.png';
// import copyImage from '../../../images/icons/copy.svg';
import fantomIcon from '../../../images/icons/fantom_Icon.png';
import Identicons from '../../../general/identicons/identicons';
import QRCodeIcon from '../../../general/qr/index';

import AccountDetailPrint from './accountDetailPrint';

class AccountInfo extends Component {
  constructor() {
    super();
    this.state = {
      revealSecret: false
    };
    this.revealSecret = this.revealSecret.bind(this);
  }

  getMnemonics() {
    const { mnemonic } = this.props;
    const mnemonicsList = [];
    const generatedMnemonic = mnemonic ? mnemonic.split(' ') : mnemonic;
    if (generatedMnemonic && generatedMnemonic.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const name of generatedMnemonic) {
        mnemonicsList.push(<li key={`${name}-1`}>{name}</li>);
      }
    }

    return mnemonicsList;
  }

  printAccountData() {
    const { mnemonic, address } = this.props;
    return (
      <div style={{ display: 'none' }}>
        <div ref={el => (this.printAccountDetail = el)}>
          <AccountDetailPrint mnemonic={mnemonic} address={address} />
        </div>
      </div>
    );
  }

  revealSecret() {
    // const SELF = this;
    // const { setButtonStatus } = SELF.props;
    this.setState({
      revealSecret: true
    });
    // const { confirmationPhrase } = this.state;
    // const data = {
    //   revealSecret: true,
    //   confirmationPhrase: confirmationPhrase === CONFIRMATION_PHASE,
    // };
    // const isAnyFieldEmpty = _.includes(data, '');
    // const isAnyFieldUndefined = _.includes(data, undefined);
    // const isPasswordIncorrect = _.includes(data, false);
    // if (!isAnyFieldEmpty && !isPasswordIncorrect && !isAnyFieldUndefined) {
    //   setButtonStatus({ isDisable: false });
    // } else {
    //   setButtonStatus({ isDisable: true });
    // }
  }

  render() {
    const {
      identiconsId,
      accountName,
      address,
      // mnemonic,
      copyAddress
      // copyMnemonic
    } = this.props;
    const getMnemonics = this.getMnemonics();
    const { revealSecret } = this.state;
    console.log(this.props, 'this.props');
    console.log(getMnemonics, 'getMnemonics');
    return (
      <React.Fragment>
        {this.printAccountData()}
        <Row>
          <Col className="acc-left-col">
            <div className="acc-qr">
              {/* <QR /> */}
              <QRCodeIcon
                className="text-right"
                address={address}
                icon={fantomIcon}
                text="FANTOM"
              />
            </div>
            <div className="acc-name-holder">
              <Identicons
                id={identiconsId}
                className="theme-blue-shadow"
                width={50}
                size={3}
              />
              <h2 className="acc-name">{accountName}</h2>
            </div>
            <h3 className="address">Your Address</h3>
            <div className="account-no">
              <p>
                <span>
                  <button
                    type="button"
                    className="clipboard-btn"
                    onClick={() => copyAddress(address)}
                  >
                    <i className="fas fa-clone" />
                  </button>
                </span>
                {address}
              </p>
            </div>
          </Col>

          <Col className="qr-col">
            <QRCodeIcon
              className="text-right"
              address={address}
              icon={fantomIcon}
              text="FANTOM"
            />
          </Col>
        </Row>
        <Row>
          <Col className="px-0">
            <div className="add-wallet">
              <h2 className="title ">
                <span>Owner Recovery Phrase</span>
              </h2>
              <ReactToPrint
                trigger={() => (
                  <Button>
                    <i className="fas fa-print" />{' '}
                  </Button>
                )}
                content={() => this.printAccountDetail}
              />
            </div>
          </Col>
        </Row>
        <Row className="bg-dark-light" style={{ padding: '90px 0' }}>
          <Col>
            <Row style={{ padding: '0 0 90px' }}>
              <Col>
                <div id="mnemonic-collector">
                  <ul className={!revealSecret ? 'blur' : ''}>
                    {getMnemonics}
                  </ul>
                  {!revealSecret && (
                    <button
                      className="blur-overley"
                      type="button"
                      onClick={this.revealSecret}
                    >
                      <div className="holder">
                        <h2>Click Here To Reveal Secret Words</h2>
                      </div>
                    </button>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="text-center no-capture">
                <img src={noView} alt="no-view" />
                <h2 className="text-danger">Screenshots are not secure</h2>
                <p className="text-white mb-0">
                  If you take a screenshot, your backup may be viewed by other
                  apps. You can make a safe backup by writting down on a
                  physical paper or print your mnemonic passphrase.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Row>
          <Col className="person-copy-info">
            <div className="info-description-box ">
              <span className="mr-3">
                <img
                  src={copyImage}
                  className="copy"
                  onClick={() => copyMnemonic(mnemonic)}
                />
              </span>
              <span id="mnemonic"> {mnemonic} </span>
            </div>
          </Col>
        </Row> */}
      </React.Fragment>
    );
  }
}

export default AccountInfo;
