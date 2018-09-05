import React from 'react';

import {
    Row,
    Col,
} from 'reactstrap';
import QRCode from 'qrcode.react';


//import identicon1 from 'images/identicon/ident-con-1.png';
// import TempQR from 'views/components/temp-components/qr';

import copyImage from '../../images/icons/copy.svg';
import  Identicons  from '../identicons/identicons';

export default class AccountInfo extends React.Component {
  render() {
      console.log('this.props. in jghsfjkashfgajksf : ', this.props)
    return (
      <span>
        <Row>
          <Col>
            <div className="person-info small">
              <div className="d-inline-block align-top" style={{ width: '40px', height: '45px', overflow: 'hidden' }}>
                {/* <img src={identicon1} className="person-image theme-blue-shadow" /> */}
                <Identicons id={this.props.identiconsId} className="person-image theme-blue-shadow" width={40} size={3} />
              </div>
              <div className="d-inline-block align-top"><h2 className="person-name">John Doe</h2>
              </div>
            </div>
          </Col>
          <Col className="text-right">
            <QRCode value={`${this.props.address} `} />
          </Col>
        </Row>
        <Row>
          <Col className="person-copy-info">
            <div>
              <h2 className="info-title mb-0">Your Address</h2>
            </div>
            <div className="info-description-box">
              <span className="mr-3">
                <img src={copyImage} className="copy mr-3" alt={copyImage} />
              </span>
              <span >{this.props.address}</span>
            </div>
            <div>
              <h2 className="info-title mb-0">Owner Recovery Phrase</h2>
            </div>
            <div className="info-description-box ">
              <span className="mr-3">
                <img src={copyImage} className="copy" />
              </span>
              <span> {this.props.mnemonic} </span>
            </div>
          </Col>
        </Row>
      </span>
    );
  }
}
