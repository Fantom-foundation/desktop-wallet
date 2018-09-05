import React from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  Container,
} from 'reactstrap';
import Logo from '../../images/Logo/logo.png';
import SettingIcon from '../../images/icons/setting.svg';




export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      
    };
  }

  toggle() {
    const {isOpen} = this.state;
    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    const {isOpen} = this.state;
    return (

        <Navbar color="dark" dark expand="md">
<Container>
          <NavbarBrand href="/"><img className="logo" src={Logo} alt={Logo}/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#"><img src={SettingIcon} alt="Setting" style={{height:'16.6px'}} /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#"><img src={SettingIcon} alt="Setting" style={{height:'16.6px'}} /></NavLink>
              </NavItem>

            </Nav>
          </Collapse>
          </Container>
        </Navbar>


   
    );
  }
}