import React, {Component} from 'react';
import {
    Row,
    Col,
    Form, FormGroup, Input, 
  } from 'reactstrap';
  import { connect } from 'react-redux';

import AccountCreationCancelModal from './accountCreationCancelModal/index';

class ConfirmRecovery extends Component {
  // onBack(){
  //   if(this.props.toggle){
  //       this.props.toggle('2');
  //   }
  // }
  constructor(props){
    super(props);
    this.state = ({
      isLocked : true,
      modal: false
    });
    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    const { isWaiting }=this.props;
    const { modal }=this.state;
    if(isWaiting){
      return null;
    }

    this.setState({
      modal: !modal
    });
  }

  inputHandler = (e) => {
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

  renderCancelAccountCreationModal(){
    const { openAccountManagement } = this.props;
    const { modal } = this.state;
    return(
      <AccountCreationCancelModal toggle={() => this.toggle()} 
        modal={modal} openAccountManagement={openAccountManagement}/>
    )
  }

    render(){
      const { activeTab, isWaiting }=this.props;
       const {isLocked }=this.state;
      if(activeTab !== '3'){
          return null;
      }

      let createWalletColor = 'gray';
       if(isWaiting){
        createWalletColor = 'gray'
       }else if(isLocked){
        createWalletColor = 'gray'
       }else{
        createWalletColor =  '#00b1ff'
       }

       let cancelBtnColor = '#00b1ff';
       if(isWaiting){
        cancelBtnColor = 'gray'
       }else if(isLocked){
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
                          <p className="text text-center black-text">Enter your mnemonic to create your account below.</p>
                          <p className="text text-center black-text">Be sure to take into out spacings and note that it is case sensitive.</p>
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
                              
                                <button type='button' 
                                  style={{ 
                                    height:'30px',
                                    width: '150px',
                                    padding:'0px 32px',
                                    fontFamily:'SFCompactDisplay',
                                    fontSize:'15px',
                                    backgroundColor:`${createWalletColor}`,
                                    border:'0px',outline: '0px',
                                    color:'#fff',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                  }} onClick={this.onUnlock.bind(this)}>Create Wallet</button>
                              </center>
                              {/* <br/> */}
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
                {/* <FooterButtons onBack={this.onBack.bind(this)}  
                        isBackActive={true} /> */}
              </div>
            </Col>
            {this.renderCancelAccountCreationModal()}
            
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

const mapDispatchToProps = () => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRecovery);