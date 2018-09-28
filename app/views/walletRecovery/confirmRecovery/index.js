import React, {Component} from 'react';
import {
    Row,
    Col,
    Form, FormGroup, Input, 
  } from 'reactstrap';
  import Bip39 from 'bip39';
  import Hdkey from 'hdkey';
  import EthUtil from 'ethereumjs-util';
  import { connect } from 'react-redux';
  // import Loader from 'react-spinners';
  import FooterButtons from '../../../general/footer/footer-buttons';

import AccountCreationCancelModal from './accountCreationCancelModal/index';
import * as KeyAction from '../../../reducers/keys/action';

class ConfirmRecovery extends Component {
  
  constructor(props){
    super(props);
    this.state = ({
      mnemonicPhrase: '',
      isLocked : true,
      modal: false,
      errorText: '',
    });
    this.toggle = this.toggle.bind(this);
  }

  /**
   * isValidSeed() :  This function is meant to check that captcha entered by user is valid or not.
   *    If invalid then error message is displayed.
   */
  isValidSeed(mnemonic) {
    const mnemonicKey = mnemonic.split(' ');
    if (mnemonicKey.length === 12) {
      return true;
    }
    return false;
  }

  handleRecoverWallet(mnemonic) {
    const newMnemonic = mnemonic.trim();
    if (!this.isValidSeed(newMnemonic)) {
      this.setState({
        errorText: 'Invalid Mnemonics!!',
        isLocked: true,
      });
      return;
    }
    this.setState({
      errorText: '',
      isLocked: false,
    });
    console.log('final mnemonic : ', newMnemonic);
    const seed = Bip39.mnemonicToSeed(newMnemonic); // creates seed buffer

    this.walletSetup(seed);
  }

  /**
   * walletSetup() : This function verifies the user and generates a unique masterPrivateKey for that user.
   *  Then navigate user to HomeScreen.
   */
  walletSetup(seed) {
    const root = Hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');

    const addrNode = root.derive("m/44'/60'/0'/0/0"); // line 1
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey); //eslint-disable-line
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const address = EthUtil.toChecksumAddress(addr);
    const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey); //eslint-disable-line
    this.props.setKeys(masterPrivateKey, address, hexPrivateKey);


  const { onUnlockAccount, password} = this.props; 
  if(onUnlockAccount){
    onUnlockAccount(true, hexPrivateKey, password, address);
  }
  }

  onBack(){
    if(this.props.toggle){
        this.props.toggle('1');
    }
  }

  toggle() {
    const { isWaiting }=this.props;
    if(isWaiting){
      return null;
    }

    this.setState({
      modal: !this.state.modal
    });
  }

  inputHandler = (e) => {
    this.setState({
      mnemonicPhrase: e.target.value,
      errorText: '',
    });

    if(e.target.value !== ''){
      this.setState({
            isLocked:false,
          });
    }else {
      this.setState({
            isLocked:true,
          });
    }
  }

  onUnlock(){
    const { onUnlockAccount, privateKey, password} = this.props; 
    const { mnemonicPhrase } = this.state;
   
    const { isLocked } = this.state;
    if(isLocked){
      return;
    }
    if( mnemonicPhrase !== ''){
      this.handleRecoverWallet(mnemonicPhrase);
    }


      // onUnlockAccount(true, privateKey, password);
  }

  renderCancelAccountCreationModal(){
    const { openAccountManagement } = this.props;
    return(
      <AccountCreationCancelModal toggle={() => this.toggle()} 
        modal={this.state.modal} openAccountManagement={openAccountManagement}/>
    )
  }

    render(){
      const { activeTab, isWaiting }=this.props;
      const { errorText } = this.state;
      if(activeTab !== '2'){
          return null;
      }

      let createWalletColor = 'gray';
       if(isWaiting){
        createWalletColor = 'gray'
       }else if(this.state.isLocked){
        createWalletColor = 'gray'
       }else{
        createWalletColor =  '#00b1ff'
       }

       let cancelBtnColor = '#00b1ff';
       if(isWaiting){
        cancelBtnColor = 'gray'
       }else if(this.state.isLocked){
        cancelBtnColor = '#00b1ff'
       }else{
        cancelBtnColor =  '#00b1ff'
       }

        return(
            <Row>
            <Col sm="12" style={{ paddingTop: '52px', paddingBottom: '52px'}}>
              <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                <Row className="mx-0">
                  <Col style={{ paddingTop: '46px', paddingBottom: '46px' }}>
                    <div className="m-auto" style={{ maxWidth: '488px' }}>
                      <Row>
                        <Col>
                          <h2 className="title large text-center black-text">Enter Your Mnemonic</h2>
                          <p className="text text-center black-text">Enter your mnemonic to recover your account below.</p>
                          <p className="text text-center black-text">Please enter space separated values and note that it is case sensitive.</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form>
                            <FormGroup>
                              <Input type="textarea" name="text" id="exampleText" placeholder="Enter Mnemonic Phrase" 
                              onChange={(e) => this.inputHandler(e)}/>
                              {errorText !== '' && <small style={{fontFamily: 'Roboto', fontSize: '14px', color: 'red'}}>{errorText}</small>}
                            </FormGroup>
                             <center>
                              
                             {!isWaiting && <button type='button' 
                                  style={{ 
                                    height:'30px',
                                    // width: '150px',
                                    padding:'0px 32px',
                                    fontFamily:'SFCompactDisplay',
                                    fontSize:'15px',
                                    backgroundColor:`${createWalletColor}`,
                                    border:'0px',outline: '0px',
                                    color:'#fff',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                  }} onClick={this.onUnlock.bind(this)}>Recover Wallet</button>}
                                  
                              
                              {isWaiting && <button type='button' 
                                style={{ 
                                  height:'30px',
                                  // width: '150px',
                                  padding:'0px 32px',
                                  fontFamily:'SFCompactDisplay',
                                  fontSize:'15px',
                                  backgroundColor:`transparent`,
                                  border:'0px',outline: '0px',
                                  color:'#fff',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                }} onClick={this.onUnlock.bind(this)}>Recover Wallet</button>}
                              </center>
                              <center>
                              <button type='button' 
                                style={{
                                    width: '150px',
                                    marginTop: '10px',
                                    padding:'0px 32px',
                                    fontFamily:'SFCompactDisplay',
                                    fontSize:'15px',
                                    color:`${cancelBtnColor}`,
                                    outline: '0px',
                                    backgroundColor: 'white',
                                    border: '0px',
                                    textDecoration: 'underline',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                  }} onClick={() => this.toggle()}>Cancel</button> 
                                  
                              </center>
                          </Form>
                        </Col>
                      </Row>
                    </div>
                   
                  </Col>
                </Row>
                <FooterButtons onBack={this.onBack.bind(this)}  
                        isBackActive />
              </div>
            </Col>
            {this.renderCancelAccountCreationModal()}
            
          </Row>
        );
    }
}


const mapStateToProps = (state) => ({
  password: state.createAccountReducer.password,
});

const mapDispatchToProps = (dispatch) => ({
  setMasterKey: key => {
    dispatch({ type: KeyAction.MASTER_KEY, key });
  },
  setPublicKey: key => {
    dispatch({ type: KeyAction.PUBLIC_KEY, key });
  },
  setKeys: (masterKey, publicKey, privateKey) => {
    dispatch({ type: KeyAction.MASTER_PUBLIC_PRIVATE_KEY, masterKey, publicKey, privateKey });
  },
  setMnemonicCode: (mnemonic) => {
      dispatch({ type: KeyAction.MNEMONIC_CODE, mnemonic});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRecovery);