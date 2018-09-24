import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class AccountCreationCancelModal extends Component {

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} backdrop='static'>
          <ModalBody style={{fontSize: '16px', fontFamily: 'Roboto'}}>
            Are you sure you want to to cancel the create wallet process?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" style={{fontSize: '14px', fontFamily: 'Roboto'}} onClick={() => this.props.openAccountManagement()}>Yes</Button>{' '}
            <Button color="danger" style={{fontSize: '14px', fontFamily: 'Roboto'}} onClick={() => this.props.toggle()}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AccountCreationCancelModal;