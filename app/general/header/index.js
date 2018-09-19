import React, { Component } from 'react';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Input } from 'reactstrap';
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
        const { handleSettings } = this.props;
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

hangleHeaderClick(){
    const {onCloseSendFunds} = this.props;
    if(onCloseSendFunds){
        onCloseSendFunds();
    }
}

    render() {
        const { isOpen } = this.state;
        const { isOpenSetting } = this.props;
       
        return (
            <Navbar color="dark" dark expand="md" onClick={() => this.hangleHeaderClick()}>
                <Container>
                    <NavbarBrand href="#" onClick={() => this.openAccountManagement()}><img className="logo" src={Logo} alt={Logo} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#">
                                <div className="theme-blue-shadow d-inline-block align-top" 
                                   style={{ cursor: 'pointer', width: '40px', height: '45px', overflow: 'hidden' }}
                                   onClick={() => this.openAccountManagement()}>
                                        <Identicons id={this.props.accountIcon} className="person-image theme-blue-shadow" width={40} size={3} />
                                    </div>
                                </NavLink>
                            </NavItem>
                            <NavItem className="add-wallet-dropdown" >
                                <NavLink href="#"><img src={SettingIcon} alt="Setting" style={{ height: '16.6px' }} 
                                    onClick={this.handleSettings.bind(this)}/></NavLink>
                                    {isOpenSetting && <div className="add-wallet-dropdown-content" >
                                        <option className="add-wallet-dropdown-content-field" onClick={this.handleUserSettings.bind(this)} >ADD NEW WALLET</option>
                                    </div>}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}