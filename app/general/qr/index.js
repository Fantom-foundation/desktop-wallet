import React, {Component} from 'react';
import {Col} from 'reactstrap';

import icon from '../../images/Logo/small-logo.svg';
import QRCode from 'qrcode.react';



class QRCodeIcon extends Component {

    renderLogo() {

        const {address, text} = this.props;
        if (address !== undefined && address !== '') {
         return (
                     <p style={{
                      backgroundImage: `url(${icon})`,
                      padding: '5px',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      paddingLeft: '25px',
                      backgroundPosition: 'left 10px center',
                      backgroundSize: 'auto 21px',
                      backgroundRepeat: 'no-repeat',
                      fontWeight: '900',
                      backgroundColor: 'white',
                      
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'}}>{text}</p>
          )
        }
      }

    render(){
        const {address, className} = this.props;
        return(
            // <Col className={`${className}`}>
            <div style={{  position: 'relative', display: 'inline-block' }}>
              {this.renderLogo()}
              <QRCode value={`${address} `} />
            </div>
          // </Col>
        )
    }
}

export default QRCodeIcon;