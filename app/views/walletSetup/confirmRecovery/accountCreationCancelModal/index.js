import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class AccountCreationCancelModal extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    const { toggle }= this.props;
    if(toggle){
      toggle();
    }
  }

  render() {
    const { modal, openAccountManagement } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle} backdrop 
        style={{transition: 'transform 0.11s linear',}}>
          <ModalBody style={{fontSize: '16px', fontFamily: 'Roboto'}}>
            Are you sure you want to cancel the create wallet process?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" style={{fontSize: '14px', fontFamily: 'Roboto'}} onClick={() => openAccountManagement()}>Yes</Button>{' '}
            <Button color="danger" style={{fontSize: '14px', fontFamily: 'Roboto'}} onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AccountCreationCancelModal;