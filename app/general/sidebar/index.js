import React from 'react';
// import PropTypes from 'prop-types';
import smallLogo from '../../images/Logo/fantom.png';

export class index extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div id="coin-overley" className="">
        <div
          className="background-overley"
          onClick={this.props.handleModalClose}
          role="presentation"
        />

        <span
          className="close-btn text-white"
          onClick={this.props.handleModalClose}
          role="presentation"
        >
          &times;
        </span>

        <div className="overley-body  bg-dark">
          <div className="main-header">
            <img src={smallLogo} className="logo" alt="Fantom" />
          </div>
          <div className="main-body">{children}</div>
        </div>
      </div>
    );
  }
}

export default index;
