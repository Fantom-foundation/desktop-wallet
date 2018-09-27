import React,{Component} from 'react';
import { Row, Col } from 'reactstrap';

/**
 * AccountFooter :  This component is meant for rendering text and other features on footer of wallet setup screen.
 */

export default class AccountFooter extends Component{
    render()
    {
        return (
            <Row className="account-footer">
                <Col>
                    <p className="text-center">This password encrypts your private key. This does not act as a speed to generate your keys. You will need this password + Mnemonic to unlock your wallet</p>
                    <ul className="text-center" style={{cursor: 'pointer'}}>
                        <li><span>How to Create a Wallet</span></li>
                        <li className="pl-3"><span>Getting Started</span></li>
                    </ul>
                </Col>
            </Row>
        );
    }
}
