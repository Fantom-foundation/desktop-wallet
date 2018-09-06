import React, { Component } from 'react';

import {
    Row,
    Col,
    Form,
} from 'reactstrap';



import { Progress } from '../../../general/core/index';
import FooterButtons from '../../../general/footer/footer-buttons';
import AccountFooter from '../../../general/footer/account-footer';
import DisplayIdenticons from '../../../general/identicons/index';

class CreateAccount extends Component {

    constructor(props) {
        super(props);
        this.state = { 
             mnemonicWords: [],
             loading: true,
             accountName: '',
             password: '',
             confirmPassword: '',
             passwordHint: '',
             identiconsId: '',
             emailErrorText: '',
             passwordErrorText: '',
             confirmPasswordErrorText: '',
             animateRefreshIcon: false,
             passwordStrength: 0,
             };
    };

      onNext(){
          const { toggle, setAccountName } = this.props;
          const {accountName} = this.state;
         if(this.isCreateAccount()){
            console.log('account created');
            if(setAccountName){
                setAccountName(accountName);
            }
            if(toggle){
                toggle('2');
            }
          }else{
              console.log('some error occured');
          }
      }

      isCreateAccount(){
          console.log(' hide next')
        const {accountName, password, confirmPassword, emailErrorText, passwordErrorText, confirmPasswordErrorText, identiconsId } = this.state;

        let isConfirmed = true;
        if(accountName === ''){
            isConfirmed = false
        } else  if(password === ''){
            isConfirmed = false
        } else  if(confirmPassword === ''){
            isConfirmed = false
        } else if(emailErrorText !== ''){
            isConfirmed = false
        } else  if(passwordErrorText !== ''){
            isConfirmed = false
        }  else  if(confirmPasswordErrorText !== ''){
            isConfirmed = false
        } else  if(identiconsId === ''){
            isConfirmed = false
        } 
        return isConfirmed;
      }


      validateData = (event,value, name) => {
        event.preventDefault();
        let validationResult = '';
        if (name === 'accountName') {
            if (value.includes('@')) {
                validationResult = this.validEmail(value);
            }
            else{
                validationResult = {errorText: ''}
            }
        } else if (name === 'password') {
            validationResult = this.validPass(value);
            this.passwordStrengthChecker(value);
        } else if (name === 'confirmPassword') {
            validationResult = this.validRepass(value);
        }
        return validationResult;
    }

    validPass = (value) => {
        const errorObj = {};
        if (value === '') {
            errorObj.errorText = 'Password field can\'t be empty';
        } else if (value.length < 8) {
            errorObj.errorText = 'Make your password with 8 characters or more. It can be any combination of letters, numbers, and symbols.';
        } else {
            errorObj.errorText = '';
        }
        return errorObj;
    }

    passwordStrengthChecker(value){
        var enoughRegex = new RegExp("(?=.{8,}).*", "g");
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})");
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{10,})");

        if (value.length===0) {
            this.setState({
                passwordStrength: 0
            })
        } else if (false === enoughRegex.test(value)) {
            this.setState({
                passwordStrength: 10
            })
        } else if (strongRegex.test(value)) {
            this.setState({
                passwordStrength: 100
            })
        } else if (mediumRegex.test(value)) {
            this.setState({
                passwordStrength: 60
            })
        } else {
            this.setState({
                passwordStrength: 30
            })
        }
    }

    validEmail = (value) => {
        const errorObj = {};
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === '') {
            errorObj.errorText = 'Account Name field can\'t be empty';
        } else if (re.test(String(value).toLowerCase())) {
            errorObj.errorText = '';
        } else {
            errorObj.errorText = 'You need to specify a valid account name';
        }
        return errorObj;
    }

    validRepass = (value) => {
        const errorObj = {};
        if (value === '') {
            errorObj.errorText = 'Re-enter password field can\'t be empty';
        } else if (value !== this.state.password) {
            errorObj.errorText = 'Password and Re-enter password must be same';
        } else {
            errorObj.errorText = '';
        }
        return errorObj;
    }
      
      setAccountName(e){
         const accountName = e.target.value.trim();
         const isValid = this.validateData(e,accountName, 'accountName');
         this.setState({
              accountName,
              emailErrorText: isValid.errorText,
          })
      }

      setPassword(e){
        const password = e.target.value.trim();
        const isValid = this.validateData(e,password, 'password');
        this.setState({
            password,
            passwordErrorText: isValid.errorText,
        })
     }

     setConfirmPassword(e){
        const confirmPassword = e.target.value.trim();
        const isValid = this.validateData(e,confirmPassword, 'confirmPassword');
        this.setState({
            confirmPassword,
            confirmPasswordErrorText: isValid.errorText,
        })
    }

    setPasswordHint(e){
        const passwordHint = e.target.value.trim();
        this.setState({
            passwordHint,
        })
    }

    getRadioIconData(identiconsId){
        const { getRadioIconData } = this.props;
        this.setState({
            identiconsId, 
        })
        if(getRadioIconData){
            getRadioIconData(identiconsId)
        }
    }

    onRefresh(){
        const { onRefresh } = this.props;
        this.setState({
            animateRefreshIcon: true, 
        });
        if(onRefresh){
            onRefresh()
        }
        setTimeout(() => (this.setState({ animateRefreshIcon: false})), 1000);
    }

renderPasswordStrengthBar(){
    const {passwordStrength} = this.state;
    let strength = 0;
    let type = 'theme-red-Yellow-green';
     if(passwordStrength === 10 ){
        strength = 10;
        type = 'theme-red-Yellow-green';
    } else if(passwordStrength === 30 ){
        strength = 30;
        type = 'theme-red-Yellow-green';
    } else if(passwordStrength === 60 ){
        strength  = 60;
        type = 'theme-red-Yellow-green';
    } else  if(passwordStrength === 100 ){
        strength = 100;
        type = 'strong-password-bar';
    }
    return(
            <Progress type={type} value={strength} /> 
    )
}
      
    render() {
        const {emailErrorText, passwordErrorText, confirmPasswordErrorText} = this.state;
        return (
            <Row>
                <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                    <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                        <Row className="mx-0">
                            <Col sm="12" className="px-5 py-3">
                                <Form>
                                    <div className="form-element form-input">
                                        <input id="AccountName" className="form-element-field" placeholder=" " type="text" required="" 
                                        onChange={this.setAccountName.bind(this)}/>
                                        <div className="form-element-bar"></div>
                                        <label className="form-element-label" for="AccountName">Account Name</label>
                                        <small className="form-element-hint">{emailErrorText}</small>
                                    </div>
                                    

                                    <Row>
                                        <Col sm={6}>
                                            <div className="form-element form-input">
                                                <input id="Password" className="form-element-field" placeholder=" " type="password" required="" 
                                                onChange={this.setPassword.bind(this)}/>
                                                <div className="form-element-bar"></div>
                                                <label className="form-element-label" for="Password">Password</label>
                                                <small className="form-element-hint">{passwordErrorText}</small>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="form-element form-input">
                                                <input id="Re-enterPassword" className="form-element-field" placeholder=" " type="password" required="" 
                                                onChange={this.setConfirmPassword.bind(this)}/>
                                                <div className="form-element-bar"></div>
                                                <label className="form-element-label" for="Re-enterPassword">Re- enter Password</label>
                                                <small className="form-element-hint">{confirmPasswordErrorText}</small>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="form-element form-input">
                                        <input id="PasswordHint" className="form-element-field" placeholder="(optional) a hint to remebering the password " type="text" required="" 
                                        onChange={this.setPasswordHint.bind(this)}/>
                                        <div className="form-element-bar"></div>
                                        <label className="form-element-label" for="PasswordHint">Password hint</label>
                                    </div>
                                    <Row className="mt-3">
                                        <Col>
                                            { this.renderPasswordStrengthBar() }
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
                        <DisplayIdenticons
                        animateRefreshIcon={this.state.animateRefreshIcon} 
                        date={this.props.date} 
                        identiconsId={this.props.identiconsId} 
                        onRefresh={this.onRefresh.bind(this)}
                        getRadioIconData={this.getRadioIconData.bind(this)} />

                        <FooterButtons 
                        onNext={this.onNext.bind(this)} 
                        isNextActive={this.isCreateAccount()}
                       />
                    </div>
                    <AccountFooter />
                </Col>
            </Row>
        );
    }
}

export default CreateAccount;