import React from 'react';

import {
    Row,
    Col,
} from 'reactstrap';
import QRCode from 'qrcode.react';

import copyImage from '../../../images/icons/copy.svg';
import fantomIcon from '../../../images/icons/fantom_Icon.png';
import  Identicons  from '../../../general/identicons/identicons';

export default class AccountInfo extends React.Component {

  renderLogo() {
    if (this.props.address !== undefined && this.props.address !== '') {
     return (
                 <p style={{
                  backgroundImage: `url(${fantomIcon})`,
                  padding: '5px',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  paddingLeft: '25px',
                  backgroundPosition: 'center left',
                  backgroundSize: '28px auto',
                  backgroundRepeat: 'no-repeat',
                  fontWeight: '900',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'}}>FANTOM</p>
      )
    }
  }


  render() {
    return (
      <span>
        <Row>
          <Col>
            <div className="person-info small">
              <div className="theme-blue-shadow d-inline-block align-top" style={{ width: '40px', height: '45px', overflow: 'hidden' }}>
                <Identicons id={this.props.identiconsId} className="person-image theme-blue-shadow" width={40} size={3} />
              </div>
              <div className="d-inline-block align-top" style={{paddingLeft: 20}}><h2 className="person-name">{this.props.accountName}</h2>
              </div>
            </div>
          </Col>
          <Col className="text-right">
            <div style={{  position: 'relative', display: 'inline-block' }}>
              {this.renderLogo()}
              <QRCode value={`${this.props.address} `} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="person-copy-info">
            <div>
              <h2 className="info-title mb-0">Your Address</h2>
            </div>
            <div className="info-description-box">
              <span className="mr-3" >
                <img src={copyImage} className="copy mr-3" alt={copyImage} 
                onClick={() => this.props.copyAddress(this.props.address)}/>
              </span>
              <span id='address'>{this.props.address}</span>
            </div>
            <div>
              <h2 className="info-title mb-0">Owner Recovery Phrase</h2>
            </div>
            <div className="info-description-box ">
              <span className="mr-3" >
                <img src={copyImage} className="copy" onClick={() => this.props.copyMnemonic(this.props.mnemonic)}/>
              </span>
              <span id='mnemonic'> {this.props.mnemonic} </span>
            </div>
          </Col>
        </Row>
      </span>
    );
  }
}
