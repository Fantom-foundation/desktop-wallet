import React, { Component } from 'react';
import { Col } from 'reactstrap';
import Identicons from '../../../general/identicons/identicons';

/**
 * AccountCard: This component is meant for displaying account details card.
 *
 * Each card contains following info:-
 * accountIcon: Icon for that account,
 * name: Name of account,
 * address: Public key address for that account,
 *
 * Functions for each account are:-
 * handleSelectedAccount: To open the details of selected account.
 * copyToClipboard: To Copy the address text to clipboard.
 */
class AccountCard extends Component {
  handleSelectedAccount() {
    const { accountInfo, handleSelectedAccount } = this.props;
    if (handleSelectedAccount) {
      handleSelectedAccount(accountInfo.address);
    }
  }

  copyToClipboard(event) {
    event.stopPropagation();
    const { accountInfo, copyToClipboard } = this.props;
    if (copyToClipboard) {
      copyToClipboard(accountInfo.address);
    }
  }

  render() {
    const { accountInfo } = this.props;
    return (
      <React.Fragment>
        <Col md={6} lg={3} className="main-col">
          <div
            onClick={this.handleSelectedAccount.bind(this)}
            role="presentation"
            className="accounts-holder"
            style={{ cursor: 'pointer' }}
          >
            <div className="avatar">
              <span className="avatar-icon">
                <Identicons
                  id={accountInfo.accountIcon}
                  className="person-image theme-blue-shadow"
                  width={40}
                  size={3}
                />
              </span>
            </div>
            <h2 className="title ">
              <span>{accountInfo.name}</span>
            </h2>
            <div className="account-no">
              <p>
                <span>
                  <i
                    role="presentation"
                    onClick={this.copyToClipboard.bind(this)}
                    className="fas fa-clone"
                  />
                </span>
                {accountInfo.address}
              </p>
            </div>
          </div>
        </Col>
      </React.Fragment>
    );
  }
}

export default AccountCard;
