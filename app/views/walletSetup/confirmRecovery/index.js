import React, {Component} from 'react';
import {
    Row,
    Col,
    Form, FormGroup, Input, 
  } from 'reactstrap';
  import { connect } from 'react-redux';
import AccountFooter from '../../../general/footer/account-footer';

class ConfirmRecovery extends Component {
  // onBack(){
  //   if(this.props.toggle){
  //       this.props.toggle('2');
  //   }
  // }
  constructor(props){
    super(props);
    this.state = ({
      mnemonicPhrase: '',
      isLocked : true,
    })
  }


  inputHandler = (e) => {
    this.setState({
      mnemonicPhrase: e.target.value
    });
    const {mnemonic} = this.props; 
    if(mnemonic === e.target.value){
      this.setState({
        isLocked:false
      });
    }else{
      this.setState({
        isLocked:true
      });
      console.log('not matched')
    }

  }

  onUnlock(){
    const { onUnlockAccount, privateKey, password} = this.props; 
    const { isLocked } = this.state;
    if(isLocked){
      return;
    }

      onUnlockAccount(true, privateKey, password);
  }

    render(){
      const { activeTab }=this.props;
      if(activeTab !== '3'){
          return null;
      }
      let createWalletColor = 'secondary';
       createWalletColor = this.state.isLocked ? 'gray' : '#00b1ff';
        return(
            <Row>
            <Col sm="12" style={{ paddingTop: '52px', paddingBottom: '52px' }}>
              <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                <Row className="mx-0">
                  <Col style={{ paddingTop: '46px', paddingBottom: '46px' }}>
                    <div className="m-auto" style={{ maxWidth: '488px' }}>
                      <Row>
                        <Col>

                          <h2 className="title large text-center black-text">Enter Your Mnemonic</h2>

                          <p className="text text-center black-text">Enter your mnemonic to create your account below.</p>
                          <p className="text text-center black-text">Be sure to take into out spacings and note that it is case sensitive.</p>
                          {/* <p className="text text-center black-text">Entering your Mnemonic phrase on a website is dangerous. If our website is compromised or you accidentally visit a different website, your funds will be stolen. Please consider:</p>
                          <div className="text-center">
                            <ul className="text w-thin text-left d-inline-block pl-4 px-sm-0">
                              <li ><a href="#">MetaMask</a> or <a href="#">A Hardware Wallet</a> or <a href="#">Running MEW Offline & Locally</a></li>
                              <li ><a href="#">Learning How to Protect Yourself and Your Funds</a></li>
                            </ul>
                          </div>

                          <p className="text text-center black-text">If you must, please double-check the URL & SSL cert. It should say <a href="https://fantom.foundation/" target="_blank">https://fantom.foundation/</a> & MYFANTOMWALLET INC in your URL bar.</p> */}
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form>
                            <FormGroup>
                              <Input type="textarea" name="text" id="exampleText" placeholder="Enter Mnemonic Phrase" 
                              onChange={(e) => this.inputHandler(e)}/>
                            </FormGroup>
                            <center>
                              <button type='button' style={{ 
                                  height:'25px',
                                  padding:'0px 32px',
                                  fontFamily:'SFCompactDisplay',
                                  fontSize:'15px',
                                  backgroundColor:`${createWalletColor}`,
                                  border:'0px',
                                  boxShadow:'none !important',
                                  color:'#fff',
                                  borderColor:`${createWalletColor}`,
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                }} onClick={this.onUnlock.bind(this)}>Create Wallet</button>
                              {/* <Button style={{backgroundColor: `${createWalletColor}`}} onClick={this.onUnlock.bind(this)}>Create Wallet</Button> */}
                              </center>
                          </Form>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                {/* <FooterButtons onBack={this.onBack.bind(this)}  
                        isBackActive={true} /> */}
              </div>
              <AccountFooter />
            </Col>
            
          </Row>
        );
    }
}


const mapStateToProps = (state) => ({
  mnemonic: state.keyReducer.mnemonic,
  privateKey: state.keyReducer.privateKey,
  password: state.createAccountReducer.password,
  // previousAccountName: state.createAccountReducer.accountName,
  // newAccountName: state.userAccountReducer.accountName,
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRecovery);