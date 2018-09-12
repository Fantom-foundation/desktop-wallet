import React,{Component} from 'react';

import { Row, Col } from 'reactstrap';

import copyImage from '../../../images/icons/copy.svg';
import fantomIcon from '../../../images/icons/fantom_Icon.png';
import Identicons  from '../../../general/identicons/identicons';
import QRCodeIcon from '../../../general/qr/index';

export default class AccountInfo extends Component {

  

  render() {
    return (
      <span>
        <Row>
          <Col>
            <div className="person-info small">
              <div className="theme-blue-shadow d-inline-block align-top" style={{ width: '40px', height: '45px', overflow: 'hidden' }}>
                <Identicons id={this.props.identiconsId} className="theme-blue-shadow" width={40} size={3} />
              </div>
              <div className="d-inline-block align-top" style={{paddingLeft: 20}}><h2 className="person-name">{this.props.accountName}</h2>
              </div>
            </div>
          </Col>
          
          <QRCodeIcon 
             className='text-right'
             address={this.props.address}
             icon={fantomIcon}
             text='FANTOM'
          />

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
