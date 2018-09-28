import React,{Component} from 'react';

import { Row, Col } from 'reactstrap';

import copyImage from '../../../images/icons/copy.svg';
import fantomIcon from '../../../images/icons/fantom_Icon.png';
import Identicons  from '../../../general/identicons/identicons';
import QRCodeIcon from '../../../general/qr/index';


 class AccountInfo extends Component {

  render() {
    const { identiconsId, accountName, address, mnemonic, copyAddress, copyMnemonic } = this.props;
    return (
      <span>
        <Row>
          <Col>
            <div className="person-info small">
              <div className="theme-blue-shadow d-inline-block align-top" style={{ width: '40px', height: '45px', overflow: 'hidden' }}>
                <Identicons id={identiconsId} className="theme-blue-shadow" width={40} size={3} />
              </div>
              <div className="d-inline-block align-top" style={{paddingLeft: 20}}><h2 className="person-name">{accountName}</h2>
              </div>
            </div>
          </Col>
          
          <Col className='text-right'>
          <QRCodeIcon 
             className='text-right'
             address={address}
             icon={fantomIcon}
             text='FANTOM'
          />
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
                onClick={() => copyAddress(address)}/>
              </span>
              <span id='address'>{address}</span>
            </div>
            <div>
              <h2 className="info-title mb-0">Owner Recovery Phrase</h2>
            </div>
            <div className="info-description-box ">
              <span className="mr-3" >
                <img src={copyImage} className="copy" onClick={() => copyMnemonic(mnemonic)}/>
              </span>
              <span id='mnemonic'> {mnemonic} </span>
            </div>
          </Col>
        </Row>
      </span>
    );
  }
}

export default AccountInfo;
