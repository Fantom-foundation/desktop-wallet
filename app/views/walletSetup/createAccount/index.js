import React, { Component } from 'react';

import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Store from '../../../store/userInfoStore/index';

import { Progress } from '../../../general/core/index';
// import FooterButtons from '../../../general/footer/footer-buttons';
import DisplayIdenticons from '../../../general/identicons/index';
import { getValidAccounts } from '../../../KeystoreManager/index';
import Loader from '../../../general/loader/index';
// import CreateAccountSteps from '../../createAccountSteps/index';
import cross from './cross.svg';
import check from './check.svg';
import user from './user.svg';
import lock from './lock.svg';

import * as CreateAccountAction from '../../../reducers/createAccount/action';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: '',
      password: '',
      confirmPassword: '',
      identiconsId: '',
      emailErrorText: '',
      passwordErrorText: '',
      confirmPasswordErrorText: '',
      animateRefreshIcon: false,
      passwordStrength: 0
    };
    this.onNext = this.onNext.bind(this);
  }

  componentWillMount() {
    const { accountName, accountIcon, password } = this.props;
    this.setState({
      accountName,
      password,
      confirmPassword: password,
      identiconsId: accountIcon,
      isUsernameVerified: 1
    });
  }

  onNext() {
    const { accountName, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      console.log('password not matched');
      return;
    }
    if (accountName !== '') {
      this.getValidAccounts(accountName);
    }
  }

  isCreateAccount() {
    const {
      accountName,
      password,
      confirmPassword,
      emailErrorText,
      passwordErrorText,
      confirmPasswordErrorText,
      identiconsId
    } = this.state;

    let isConfirmed = true;
    if (accountName === '') {
      isConfirmed = false;
    } else if (password === '') {
      isConfirmed = false;
    } else if (confirmPassword === '') {
      isConfirmed = false;
    } else if (emailErrorText !== '') {
      isConfirmed = false;
    } else if (passwordErrorText !== '') {
      isConfirmed = false;
    } else if (confirmPasswordErrorText !== '') {
      isConfirmed = false;
    } else if (identiconsId === '') {
      isConfirmed = false;
    }

    return isConfirmed;
  }

  isNextButtonDisable = () => {
    const disable = !this.isCreateAccount();
    return disable;
  };

  validateData = (event, value, name) => {
    event.preventDefault();
    let validationResult = '';
    if (name === 'accountName') {
      const regex = /^[a-zA-Z ]{2,30}$/;
      const result = regex.test(value);
      if (result) {
        validationResult = { errorText: '' };
      } else {
        validationResult = { errorText: 'Enter a valid name' };
      }

      // if (value.includes('@')) {
      //     validationResult = this.validEmail(value);
      // }
      // else{
      //     validationResult = {errorText: ''}
      // }
    } else if (name === 'password') {
      validationResult = this.validPass(value);
      this.passwordStrengthChecker(value);
    } else if (name === 'confirmPassword') {
      validationResult = this.validRepass(value);
    }
    return validationResult;
  };

  validPass = value => {
    const errorObj = {};
    if (value === '') {
      errorObj.errorText = "Password field can't be empty";
    } else if (value.length < 8) {
      errorObj.errorText =
        'Make your password with 8 characters or more. It can be any combination of letters, numbers, and symbols.';
    } else if (value.match(/[A-Z]/) === null) {
      errorObj.errorText = 'Password field should contain one Capital letter';
    } else if (value.match(/[0-9]/) === null) {
      errorObj.errorText = 'Password field should contain one number';
    } else {
      errorObj.errorText = '';
    }
    return errorObj;
  };

  passwordStrengthChecker(value) {
    const enoughRegex = new RegExp('(?=.{8,}).*', 'g');
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})'
    );
    const mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{10,})'
    );

    if (value.length === 0) {
      this.setState({
        passwordStrength: 0
      });
    } else if (enoughRegex.test(value) === false) {
      this.setState({
        passwordStrength: 10
      });
    } else if (strongRegex.test(value)) {
      this.setState({
        passwordStrength: 100
      });
    } else if (mediumRegex.test(value)) {
      this.setState({
        passwordStrength: 60
      });
    } else {
      this.setState({
        passwordStrength: 30
      });
    }
  }

  validEmail = value => {
    const errorObj = {};
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === '') {
      errorObj.errorText = "Account Name field can't be empty";
    } else if (re.test(String(value).toLowerCase())) {
      errorObj.errorText = '';
    } else {
      errorObj.errorText = 'You need to specify a valid account name';
    }
    return errorObj;
  };

  validRepass = value => {
    const { password } = this.state;
    const errorObj = {};
    if (value === '') {
      errorObj.errorText = "Re-enter password field can't be empty";
    } else if (value !== password) {
      errorObj.errorText =
        'Password and re-enter password fields must be the same.';
    } else {
      errorObj.errorText = '';
    }
    return errorObj;
  };

  setAccountName(e) {
    const accountName = e.target.value;
    const isValid = this.validateData(e, accountName, 'accountName');
    this.setState(
      {
        accountName,
        emailErrorText: isValid.errorText
      },
      () => {
        this.props.changeDisableButtons();
      }
    );
  }

  setPassword(e) {
    const password = e.target.value.trim();
    const isValid = this.validateData(e, password, 'password');
    this.setState(
      {
        password,
        passwordErrorText: isValid.errorText
      },
      () => {
        if (this.state.confirmPassword) {
          this.setConfirmPassword(
            {
              target: {
                value: this.state.confirmPassword
              },
              preventDefault: () => console.log('fake prevent Default')
            },
            () => {
              this.props.changeDisableButtons();
            }
          );
        } else {
          this.props.changeDisableButtons();
        }
      }
    );
  }

  setConfirmPassword(e) {
    const confirmPassword = e.target.value.trim();
    const isValid = this.validateData(e, confirmPassword, 'confirmPassword');
    this.setState(
      {
        confirmPassword,
        confirmPasswordErrorText: isValid.errorText
      },
      () => {
        this.props.changeDisableButtons();
      }
    );
  }

  getRadioIconData(identiconsId) {
    // const { getRadioIconData } = this.props;
    this.setState(
      {
        identiconsId
      },
      () => {
        this.props.changeDisableButtons();
      }
    );

    // if(getRadioIconData){
    //     getRadioIconData(identiconsId)
    // }
  }

  onRefresh() {
    const { onRefresh } = this.props;
    this.setState({
      animateRefreshIcon: true
    });
    if (onRefresh) {
      onRefresh();
    }
    setTimeout(() => this.setState({ animateRefreshIcon: false }), 1000);
  }

  renderPasswordStrengthBar() {
    const { passwordStrength } = this.state;
    let strength = 0;
    let type = 'theme-red-Yellow-green';
    if (passwordStrength === 10) {
      strength = 10;
      type = 'theme-red-Yellow-green';
    } else if (passwordStrength === 30) {
      strength = 30;
      type = 'theme-red-Yellow-green';
    } else if (passwordStrength === 60) {
      strength = 60;
      type = 'theme-red-Yellow-green';
    } else if (passwordStrength === 100) {
      strength = 100;
      type = 'strong-password-bar';
    }
    return <Progress type={type} value={strength} />;
  }

  /**
   * getValidAccounts() : Api for getting list of valid accounts and setting the data to state and reducer.
   */
  getValidAccounts(accountName) {
    const { toggle, setNewAccountDetail } = this.props;
    const { password, identiconsId } = this.state;

    this.setState({
      isUsernameVerified: 2
    });
    setTimeout(() => {
      getValidAccounts()
        .then(storeKeys => {
          if (storeKeys.success) {
            const { result } = storeKeys;
            this.updateStoreKey(result);

            const storeSize = Store.size;
            let isValidUser = true;
            if (storeSize > 0) {
              const keys = Object.keys(Store.store);
              const accountDetailList = [];
              for (const key of keys) {
                accountDetailList.push(Store.store[key]);
              }

              for (const accountDetail of accountDetailList) {
                if (accountDetail.name === accountName) {
                  isValidUser = false;
                  this.setState({
                    emailErrorText: 'Username already exists!',
                    isUsernameVerified: 3
                  });
                }
              }
            }
            if (isValidUser) {
              if (this.isCreateAccount()) {
                setNewAccountDetail(accountName.trim(), password, identiconsId);
                this.setState({
                  isUsernameVerified: 1
                });
                if (toggle) {
                  toggle('2');
                }
              } else {
                console.log('some error occured');
                this.setState({
                  isUsernameVerified: 3
                });
              }
            }
            return storeKeys.result;
          }
          return [];
        })
        .catch(() => []);
    }, 10);
  }

  /**
   * updateStoreKey : To delete invalid account from store.
   */
  updateStoreKey(storeKeys) {
    const keys = Object.keys(Store.store);
    for (const key of keys) {
      let isValidKey = false;
      for (const validKey of storeKeys) {
        if (validKey === key) {
          isValidKey = true;
          break;
        }
      }
      if (!isValidKey) {
        Store.delete(key);
      }
    }
  }

  renderLoader = () => {
    const { isUsernameVerified } = this.state;
    const style = {
      top: '90%',
      padding: '12px 16px',
      zIndex: '1',
      display: 'inline-block',
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };
    if (isUsernameVerified && isUsernameVerified === 2) {
      return (
        <div style={style}>
          <Loader
            sizeUnit="px"
            size={25}
            color="#000"
            loading={isUsernameVerified === 2}
          />
        </div>
      );
    }
    return null;
  };

  // isGoToAccountManagement(){

  // }

  // onClose(){

  // }

  render() {
    const { activeTab, date } = this.props;
    if (activeTab !== '1') {
      return null;
    }

    const {
      emailErrorText,
      confirmPasswordErrorText,
      accountName,
      password,
      confirmPassword,
      animateRefreshIcon,
      identiconsId
    } = this.state;
    return (
      <section className="bg-dark" style={{ padding: '60px 0px ' }}>
        <Container>
          <Row>
            <Col sm="12">
              <Form id="create-account-form">
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter Account Name"
                    value={accountName}
                    onChange={this.setAccountName.bind(this)}
                    style={{ backgroundImage: `url(${user})` }}
                  />
                  <small className="text-danger">{emailErrorText}</small>
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Input
                        type="password"
                        name="pass"
                        placeholder="Enter Password"
                        value={password}
                        onChange={this.setPassword.bind(this)}
                        style={{ backgroundImage: `url(${lock})` }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        name="name"
                        placeholder="Re-enter Password"
                        value={confirmPassword}
                        onChange={this.setConfirmPassword.bind(this)}
                        style={{ backgroundImage: `url(${lock})` }}
                      />
                      <small className="text-danger">
                        {confirmPasswordErrorText}
                      </small>
                    </FormGroup>
                  </Col>
                  {password.length ? (
                    <Col md={4} lg={3}>
                      <ul className="pass-validator">
                        <li className="correct">
                          <img
                            src={password.length >= 8 ? check : cross}
                            alt="correct"
                            className="ico"
                          />
                          8+ Characters
                        </li>
                        <li className="false">
                          <img
                            src={
                              password.match(/[A-Z]/) !== null ? check : cross
                            }
                            alt="invalid"
                            className="ico"
                          />
                          1 Upper Case Letter
                        </li>
                        <li className="false">
                          <img
                            src={
                              password.match(/[0-9]/) !== null ? check : cross
                            }
                            alt="invalid"
                            className="ico"
                          />
                          1+ Number
                        </li>
                      </ul>
                    </Col>
                  ) : null}
                </Row>
              </Form>

              <DisplayIdenticons
                animateRefreshIcon={animateRefreshIcon}
                date={date}
                identiconsId={identiconsId}
                onRefresh={this.onRefresh.bind(this)}
                getRadioIconData={this.getRadioIconData.bind(this)}
              />
              {this.renderLoader()}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  accountName: state.createAccountReducer.accountName,
  accountIcon: state.createAccountReducer.accountIcon,
  address: state.keyReducer.publicKey,
  password: state.createAccountReducer.password
});

const mapDispatchToProps = dispatch => ({
  setNewAccountDetail: (accountName, password, accountIcon) => {
    dispatch({
      type: CreateAccountAction.CREATE_NEW_ACCOUNT,
      accountName,
      password,
      accountIcon
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(CreateAccount);
