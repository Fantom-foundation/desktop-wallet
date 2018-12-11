import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import withdrawImage from '../../images/withdraw.svg';
import { toFixed } from '../../constants/index';

/**
 * Select : Component for displaying dropdown of wallets in 'withdraw from' field in send funds screen.
 */
export default class Select extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    let { maxFantomBalance } = this.props;
    maxFantomBalance = toFixed(Number(maxFantomBalance), 4);
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          className="toggle-btn"
          style={{
            backgroundImage: `url(${withdrawImage})`
          }}
        >
          {this.props.value}
          <span className="ftm text-white">{maxFantomBalance} FTM</span>
        </DropdownToggle>
        <DropdownMenu>{this.props.accountDetailList}</DropdownMenu>
      </Dropdown>
    );
  }
}
