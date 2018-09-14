import React, { Component } from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import QRCodeIcon from '../../../general/qr/index';

import smallLogo from '../../../images/Logo/small-logo.svg';
import smallLogoWhite from '../../../images/Logo/small-logo-white.svg';

class AccountDetailPrint extends Component {
    render() {
        return (
            <div><p>hello</p></div>
            // <div>
            //     <div className="print-screen">
            //         <Row className="mx-0">
            //             <Col className="pt-3">
            //                 <Row>
            //                     <Col>
            //                         <p className="address large">Your Address</p>
            //                     </Col>
            //                 </Row>
            //                 <Row>
            //                     <Col className="text-right">
            //                         <QRCodeIcon
            //                             className=''
            //                             address="abc"
            //                             //  icon={fantomIcon}
            //                             text='FANTOM'
            //                         />
            //                     </Col>
            //                     <Col className="pt-4">
            //                         <p className="account-no roboto" style={{ marginBottom: '54px' }}>0x59d50B3XXXXXXXXXXXXXXXXXXXCBE154D</p>
            //                         <div className="light-text">
            //                             <p>This password encrypts your private key.</p>
            //                             <p>This does not act as a seed to generate your keys.</p>
            //                             <p>You will need this password + mnemonickey to unlock your wallet.</p>
            //                         </div>
            //                     </Col>
            //                 </Row>
            //             </Col>
            //             <Col className="brand px-0">
            //                 <div className="brand-body">
            //                     <p className="logo"><img src={smallLogo} />Fantom</p>
            //                     <a htef="https://fantom.foundation/" className="link">https://fantom.foundation/</a>
            //                 </div>
            //             </Col>
            //         </Row>
            //     </div>


            //     <div className="print-screen">
            //         <Row className="mx-0">
            //             <Col className="pt-3" style={{ paddingLeft: '49px' }}>
            //                 <Row>
            //                     <Col className="pr-0">
            //                         <p className="address mb-0">Your Address</p>
            //                         <p className="account-no mb-2">0x59d50B3XXXXXXXXXXXXXXXXXXXCBE154D</p>
            //                         <p className="mb-0">Mnemonic Phrase</p>
            //                         <p>unmoved skewed primary pointing pep prescribe on stage eject unbiased skeleton robot click </p>
            //                     </Col>
            //                 </Row>
            //                 <Row className="qr-with-rotated-text pb-2">
            //                     <Col >
            //                         <QRCodeIcon
            //                             className=''
            //                             address="abc"
            //                             //  icon={fantomIcon}
            //                             text='FANTOM'
            //                         />
            //                         <p className="address rotate-anti inline-block text-uppercase">Your Address</p>
            //                     </Col>
            //                     <Col>
                                    
            //                     <p className="address rotate-anti inline-block">AMOUNT / NOTES</p>
            //                     </Col>
            //                 </Row>
            //             </Col>
            //             <Col className="brand blue px-0">
            //                 <div className="brand-body">
            //                     <p className="logo"><img src={smallLogoWhite} />Fantom</p>
            //                     <a htef="https://fantom.foundation/" className="link">https://fantom.foundation/</a>
            //                 </div>
            //             </Col>
            //         </Row>
            //     </div>
            // </div>
        )
    }
}

export default AccountDetailPrint;