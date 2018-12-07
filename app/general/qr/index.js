import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import FantomLogo from '../fantomLogo/index';

/**
 * QRCodeIcon: This component is meant for rendering QR code image for particuler address on screen,
 *  along with fantom logo.
 */
class QRCodeIcon extends Component {
  renderLogo() {
    const { address } = this.props;
    if (address !== undefined && address !== '') {
      return (
        <p
          style={{
            padding: '1px 5px',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '128px'
          }}
        >
          <FantomLogo logoType={2} />
        </p>
      );
    }
  }

  render() {
    const { address, bgColor, fgColor } = this.props;
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {this.renderLogo()}
        <QRCode
          bgColor={bgColor}
          fgColor={fgColor}
          value={`${address}`}
          renderAs="svg"
          level="H"
          size={158}
        />
      </div>
    );
  }
}

export default QRCodeIcon;
