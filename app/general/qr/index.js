import React, {Component} from 'react';
import QRCode from 'qrcode.react';
import FantomLogo from '../fantomLogo/index';


class QRCodeIcon extends Component {

    renderLogo() {

        const {address, text} = this.props;
        if (address !== undefined && address !== '') {
         return (
                    <p style={{
                      padding: '1px 5px',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      position: 'absolute',
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      width: '128px'
                    }}
                     >
                        <FantomLogo logoType={2}/>
                      </p>
          )
        }
      }

    render(){
        const { address } = this.props;
        return(
            <div style={{  position: 'relative', display: 'inline-block' }}>
              {this.renderLogo()}
              <QRCode value={`${address}`} level='H' size={158}/>
            </div>
        )
    }
}

export default QRCodeIcon;