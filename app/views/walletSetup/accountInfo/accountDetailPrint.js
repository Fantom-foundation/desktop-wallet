import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import QRCodeIcon from '../../../general/qr/index';
import logo from '../../../images/Logo/fantom.png';

class AccountDetailPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressTitle: 'Your Address',
      url: 'https://fantom.foundation/'
    };
  }

  render() {
    const { mnemonic, address } = this.props;
    const { addressTitle, url } = this.state;
    return (
      <div id="print-screen">
        <Row>
          <Col className="info">
            <h2>{addressTitle}</h2>
            <p>{address}</p>
            <h2>Mnemonic Phrase</h2>
            <p className="mnemonic">{mnemonic}</p>
            <div className="qr">
              <QRCodeIcon address={address} text="FANTOM" />
            </div>
          </Col>
          <Col className="brand">
            <div className="brand-holder">
              <img src={logo} alt="logo" />
              <p>{url}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AccountDetailPrint;
