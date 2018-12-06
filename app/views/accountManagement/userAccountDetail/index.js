import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';

import Identicons from '../../../general/identicons/identicons';
// import copyImage from '../../../images/icons/copy.svg';
import { addCommasToNumber } from '../../../general/util/index';
import QRCodeIcon from '../../../general/qr/index';

/**
 * UserAccountDetail: This component is meant for rendering details of account selected from accounts list.
 * this card contains following info:-
 * identiconsId: Icon for that account,
 * name: Name of account,
 * address: Public key address for that account,
 * transactionLength: Count of sent transactions.
 *
 * Functions for each account are:-
 * copyToClipboard: To Copy the address text to clipboard.
 */
class UserAccountDetail extends Component {
  render() {
    const {
      identiconsId,
      name,
      address,
      copyToClipboard,
      // transactionCount,
      isTransferringMoney,
      transactionLength,
      onTransferFund,
      onRefresh
    } = this.props;
    let { balance } = this.props;
    if (balance) {
      balance = addCommasToNumber(balance);
    }

    return (
      <Col md={12} lg={4} className="mb-4 mb-lg-0">
        <div className="bg-dark-light">
          <div className="add-wallet">
            <h2 className="title ">
              <span>Account Management</span>
            </h2>
            <Button onClick={() => onRefresh()}>
              <i className="fas fa-sync-alt" />
            </Button>
          </div>
          <div id="acc-details">
            <div className="avatar-container">
              <span className="avatar">
                <Identicons id={identiconsId} width={40} size={3} />
              </span>
            </div>
            <h2 className="acc-title text-primary">{name}</h2>
            <div className="account-no">
              <p>
                <span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(address)}
                    className="clipboard-btn"
                  >
                    <i className="fas fa-clone" />
                  </button>
                </span>
                {address}
              </p>
            </div>
            <div className="info">
              <p>Ledger {name}</p>
              {/* <p>{transactionLength} Outgoing transaction</p> */}
            </div>
            <div className="qr">
              <QRCodeIcon address={address} text="FANTOM" />
            </div>
            <div className="ftm-no">
              <p>
                {balance ? `${balance}` : '0'}{' '}
                <span>{balance === '-' ? '' : 'FTM'}</span>
              </p>
            </div>
            <center>
              <Button
                color="primary"
                onClick={() => onTransferFund()}
                // disabled={isTransferringMoney}
                className={
                  isTransferringMoney ? 'bordered mt-3 light' : 'bordered mt-3'
                }
              >
                {isTransferringMoney ? 'Transferring....' : 'Transfer'}
              </Button>
            </center>
          </div>
        </div>
      </Col>
    );
  }
}

export default UserAccountDetail;
