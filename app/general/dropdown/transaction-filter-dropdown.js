import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { ALL_TX, SENT_TX, RECEIVED_TX } from '../../constants/index';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.filterTransaction = this.filterTransaction.bind(this);
    this.state = {
      dropdownOpen: false,
      txType: this.props.txType
    };
  }

  /**
   * This method will toggle the dropdown
   */
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  /**
   * Filter to display transaction list.
   */
  filterTransaction(txType) {
    const { filterTransaction } = this.props;
    if (filterTransaction) {
      filterTransaction(txType);
      this.setState({
        txType
      });
    }
  }

  render() {
    const { dropdownOpen, txType } = this.state;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="toggle-btn" caret>
          {txType}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.filterTransaction(ALL_TX)}>
            {ALL_TX}
          </DropdownItem>
          <DropdownItem onClick={() => this.filterTransaction(SENT_TX)}>
            {SENT_TX}
          </DropdownItem>
          <DropdownItem onClick={() => this.filterTransaction(RECEIVED_TX)}>
            {RECEIVED_TX}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
