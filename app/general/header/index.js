import React, { Component } from 'react';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
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

    handleUserSettings(){
        const { handleUserSettings } = this.props;
        if(handleUserSettings){
            handleUserSettings();
        }
    }

    render() {
        const { isOpen } = this.state;
        return (
            <Navbar color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="/"><img className="logo" src={Logo} alt={Logo} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#">
                                    <div className="theme-blue-shadow d-inline-block align-top" style={{ width: '40px', height: '45px', overflow: 'hidden' }}>
                                        <Identicons id={this.props.accountIcon} className="person-image theme-blue-shadow" width={40} size={3} />
                                    </div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#"><img src={downArrowIcon} alt="Down Arrow " style={{ height: '16.6px' }} /></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#"><img src={NotificationIcon} alt="Notification" style={{ height: '16.6px' }} /></NavLink>
                            </NavItem>
                            <NavItem onClick={this.handleUserSettings.bind(this)}>
                                <NavLink href="#"><img src={SettingIcon} alt="Setting" style={{ height: '16.6px' }} /></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}