import React from 'react';
import smallLogo from '../../images/Logo/FANTOM_LOGO_White.svg';

/**
 * Component to render sidebar for send fund and confirm send fund screen.
 */
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

        <div className="overley-body  bg-dark">
          <div className="main-header">
            <span
              className="close-btn text-white"
              onClick={this.props.handleModalClose}
              role="presentation"
            >
              &times;
            </span>
            <img src={smallLogo} className="logo height-30" alt="Fantom" />
          </div>
          <div className="main-body">{children}</div>
        </div>
      </div>
    );
  }
}

export default index;
