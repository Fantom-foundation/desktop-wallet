import React, { Component } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Logo from '../../images/Logo/FANTOM_LOGO_White.svg';

/**
 * Header : This component is meant for rendering header bar in application.
 */

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  /**
   * toggle() :  To handle toggle settings of header bar, when screen size decreases, i.e. toggle header on click on Burger icon.
   */
  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  /**
   * handleSettings() :  This function is meant for handling event for click on setting button on header bar.
   */
  handleSettings() {
    const { handleSettings } = this.props;
    if (handleSettings) {
      handleSettings();
    }
  }

  /**
   * handleUserSettings() :  This function is meant for handling event for click on 'Add Wallet' button in 'setting' on header bar, for adding new wallet.
   */
  handleUserSettings() {
    const { handleUserSettings } = this.props;
    if (handleUserSettings) {
      handleUserSettings();
    }
  }

  /**
   * openAccountManagement() :  This function is meant for handling event for click on 'Fantom Logo' icon on header bar,
   *  for rendering account management list, if atleast one account is added to wallet.
   */

  openAccountManagement() {
    const { openAccountManagement } = this.props;
    if (openAccountManagement) {
      openAccountManagement();
    }
  }

  /**
   * openAccount() :  This function is meant for handling event for click on 'Account icon' icon on header bar,
   *  for rendering account management list, if atleast one account is added to wallet.
   */
  openAccount() {
    const { openAccount } = this.props;
    if (openAccount) {
      openAccount();
    }
  }

  /**
   * hangleHeaderClick() : This function is meant for handling event for closing settings when click on header bar.
   */
  hangleHeaderClick() {
    const { handleCloseSettings } = this.props;
    if (handleCloseSettings) {
      handleCloseSettings();
    }
  }

  /**
   * openWalletRecovery() :  This function is meant for handling event for click on 'Restore Wallet' button in 'setting' on header bar, for recovering wallet.
   */
  openWalletRecovery() {
    const { openWalletRecovery } = this.props;
    if (openWalletRecovery) {
      openWalletRecovery();
    }
  }

  render() {
    const { isOpen } = this.state;
    const { isWalletSetup, isWalletRecover } = this.props;
    const selectedTabColor = '#549aec';
    const createWalletTabColor = !isWalletSetup ? selectedTabColor : null;
    const restoreWalletTabColor = !isWalletRecover ? selectedTabColor : null;
    const accountTabColor =
      isWalletSetup && isWalletRecover ? selectedTabColor : null;

    return (
      <header id="header">
        <div className="nav-holder">
          <Navbar dark expand="md">
            <NavbarBrand href="#" onClick={() => this.openAccountManagement()}>
              <img className="logo" src={Logo} alt="Logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <NavLink
                    onClick={this.handleUserSettings.bind(this)}
                    style={{
                      color: createWalletTabColor
                    }}
                  >
                    CREATE WALLET
                  </NavLink>
                </NavItem>
                <NavItem
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <NavLink
                    onClick={this.openWalletRecovery.bind(this)}
                    style={{
                      color: restoreWalletTabColor
                    }}
                  >
                    RESTORE WALLET
                  </NavLink>
                </NavItem>
                <NavItem style={{ cursor: 'pointer' }}>
                  <NavLink
                    href="#"
                    onClick={this.openAccountManagement.bind(this)}
                    style={{
                      color: accountTabColor
                    }}
                  >
                    ACCOUNTS
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </header>
    );
  }
}
