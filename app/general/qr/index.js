import React, {Component} from 'react';
import QRCode from 'qrcode.react';

// import icon from '../../images/Logo/small-logo.svg';
import icon from '../../images/icons/fantom_logo_TranparentBlackQRIcon.png';



class QRCodeIcon extends Component {

    renderLogo() {

        const {address, text} = this.props;
        if (address !== undefined && address !== '') {
         return (
                    //  <p style={{
                    //   backgroundImage: `url(${icon})`,
                    //   padding: '5px',
                    //   alignSelf: 'center',
                    //   justifyContent: 'center',
                    //   fontSize: '14px',
                    //   paddingLeft: '25px',
                    //   backgroundPosition: 'left 10px center',
                    //   backgroundSize: 'auto 21px',
                    //   backgroundRepeat: 'no-repeat',
                    //   fontWeight: '900',
                    //   backgroundColor: 'white',
                      
                    //   position: 'absolute',
                    //   top: '50%',
                    //   left: '50%',
                    //   transform: 'translate(-50%, -50%)'}}>{text}</p>

                    <p style={{
                      padding: '1px 5px',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      position: 'absolute',
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)'}}>
                        <img src={icon} height={20} />
                      </p>
          )
        }
      }

    render(){
        const { address } = this.props;
        return(
            <div style={{  position: 'relative', display: 'inline-block' }}>
              {this.renderLogo()}
              <QRCode value={`${address}`} level='H' />
            </div>
        )
    }
}

export default QRCodeIcon;