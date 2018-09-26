import React, { Component } from 'react';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import Logo from '../../images/Logo/logo.png';
import SettingIcon from '../../images/icons/setting.svg';
import NotificationIcon from '../../images/icons/notification_red.png';
import downArrowIcon from '../../images/icons/downArrowWhite.svg';
import Identicons from '../identicons/identicons';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggle() {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        })
    }

    handleSettings(){
        const { handleSettings, isOpenAccountDetail } = this.props;
        // if(isOpenAccountDetail === false){
        //     return null;
        // }
        if(handleSettings){
            handleSettings();
        }
    }

    handleUserSettings(){
        const { handleUserSettings } = this.props;
        if(handleUserSettings){
            handleUserSettings();
        }
    }    
    
    openAccountManagement(){
        const { openAccountManagement }= this.props;
        if(openAccountManagement){
            openAccountManagement();
        }
    }

    openAccount(){
        const { openAccount }= this.props;
        if(openAccount){
            openAccount();
        }
    }

hangleHeaderClick(){
    // const {onCloseSendFunds} = this.props;
    // if(onCloseSendFunds){
    //     onCloseSendFunds();
    // }

    const { handleCloseSettings } = this.props;
    if(handleCloseSettings){
        handleCloseSettings();
    }
}

openWalletRecovery(){
    const { openWalletRecovery } = this.props;
    if( openWalletRecovery ){
        openWalletRecovery();
    }
}

renderAccountSetting(){
    const { isOpenSetting, isWalletSetup, isWalletRecover } = this.props;
    return(
        <Dropdown isOpen={isOpenSetting} toggle={this.handleSettings.bind(this)} className="h-100">
             <DropdownToggle className=" ml-3 my-3 px-0 border-0" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                <img src={SettingIcon} alt="Setting" style={{ height: '16.6px', }}  />
             </DropdownToggle>
             <DropdownMenu className='pt-0 ' right>
                <div className="add-wallet-dropdown-content" >
                    {isWalletSetup && <option className="add-wallet-dropdown-content-field" onClick={this.handleUserSettings.bind(this)} >Add Wallet</option>}
                    {isWalletRecover && <option className="add-wallet-dropdown-content-field" onClick={this.openWalletRecovery.bind(this)} >Restore Wallet</option>}
                </div>
             </DropdownMenu>
        </Dropdown>
    )
}

    render() {
        const { isOpen } = this.state;
        // const { isOpenAccountDetail } = this.props;
       
        return (
            <Navbar color="dark" dark expand="md" >
                <Container>
                    <NavbarBrand href="#" onClick={() => this.openAccountManagement()}><img className="logo" src={Logo} alt={Logo} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {/* <NavItem>
                                <NavLink href="#">
                                {isOpenAccountDetail && <div className="theme-blue-shadow d-inline-block align-top" 
                                   style={{ cursor: 'pointer', width: '40px', height: '40px', overflow: 'hidden', borderRadius: '100%',backgroundColor: '#fff' }}
                                   onClick={() => this.openAccount()}>
                                        <div style={{transform: 'translate(20%, 3%)', height: '100px'}}>
                                        <Identicons id={this.props.accountIcon} className="person-image theme-blue-shadow" width={26} size={3}/>
                                        </div>
                                    </div>}
                                </NavLink>
                            </NavItem> */}
                            <NavItem className="add-wallet-dropdown" >
                               {this.renderAccountSetting()}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}