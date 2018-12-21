import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

/**
 * TxHashTooltip : To display tooltip with Transaction hash for copying Transaction hash.
 */
export default class TxHashTooltip extends Component {
  constructor(props) {
    super(props);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.state = {
      isOpenTooltip: false,
      tooltipText: 'Click to copy'
    };
  }

  /**
   * @method toggleTooltip  : To toggle tooltip view.
   */
  toggleTooltip() {
    this.setState({
      isOpenTooltip: !this.state.isOpenTooltip
    });
  }

  render() {
    const { hash, index, copyToClipboard } = this.props;
    const { tooltipText, isOpenTooltip } = this.state;
    return (
      <p
        style={{ cursor: 'pointer' }}
        id={`copyToClipboard_tooltip${index}`}
        onClick={() => copyToClipboard(hash)}
      >
        <span>TX#</span> {hash}
        <Tooltip
          placement="top"
          isOpen={isOpenTooltip}
          target={`copyToClipboard_tooltip${index}`}
          toggle={this.toggleTooltip}
        >
          {tooltipText}
        </Tooltip>
      </p>
    );
  }
}
