import React, { Component } from 'react';

import {
    Row,
    Col,
    Form,
} from 'reactstrap';



import { Progress } from '../../../general/core/index';
import FooterButtons from '../../../general/footer/footer-buttons';
import AccountFooter from '../../../general/footer/account-footer';
import DisplayIdenticons from '../../../containers/identicons/index';

class CreateAccount extends Component {

    constructor(props) {
        super(props);
        // this.state = { mnemonicWords: [], loading: true };
    };

      onNext(){
        if(this.props.toggle){
            this.props.toggle('2');
        }
      }
      getRadioIconData(){
          if(this.props.getRadioIconData){
              this.props.getRadioIconData();
          }
      }
      
    render() {
        return (
            <Row>
                <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                    <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                        <Row className="mx-0">
                            <Col sm="12" className="px-5 py-3">
                                <Form>
                                    <div className="form-element form-input">
                                        <input id="AccountName" className="form-element-field" placeholder=" " type="text" required="" />
                                        <div className="form-element-bar"></div>
                                        <label className="form-element-label" for="AccountName">Account Name</label>
                                        <small className="form-element-hint">You need to specify a valid account name</small>
                                    </div>
                                    <div className="form-element form-input">
                                        <input id="PasswordHint" className="form-element-field" placeholder="(optional) a hint to help with remembering the password " type="text" required="" />
                                        <div className="form-element-bar"></div>
                                        <label className="form-element-label" for="PasswordHint">Password hint</label>
                                        <small className="form-element-hint">You need to specify a valid account name</small>
                                    </div>

                                    <Row>
                                        <Col sm={6}>
                                            <div className="form-element form-input">
                                                <input id="Password" className="form-element-field" placeholder=" " type="text" required="" />
                                                <div className="form-element-bar"></div>
                                                <label className="form-element-label" for="Password">Password</label>
                                                <small className="form-element-hint">You need to specify a valid account name</small>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="form-element form-input">
                                                <input id="Re-enterPassword" className="form-element-field" placeholder=" " type="text" required="" />
                                                <div className="form-element-bar"></div>
                                                <label className="form-element-label" for="Re-enterPassword">password(repeat)</label>
                                                <small className="form-element-hint">You need to specify a valid account name</small>
                                            </div>
                                        </Col>
                                    </Row>
                                   
                                    <Row className="mt-3">
                                        <Col>
                                        <p className="text text-gray" >password strength</p>
                                            <Progress type="theme-red-Yellow-green" value={40} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                        <p className="Form-Text mt-3">Make your password with 8 characters or more. It can be any combination of letters, numbers, and symbols.</p>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <DisplayIdenticons date={new Date()} identiconsId={1} getRadioIconData={this.props.getRadioIconData}/>
                        {/* <DisplayIdenticons date={this.props.date} 
                        identiconsId={this.props.identiconsId} 
                        refreshData={this.props.refreshData} getRadioData={this.props.getRadioData} /> */}

                        <FooterButtons onNext={this.onNext.bind(this)} isActive={true}/>
                    </div>
                    <AccountFooter />
                </Col>
            </Row>
        );
    }
}

export default CreateAccount;