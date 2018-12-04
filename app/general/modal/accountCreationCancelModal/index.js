import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class AccountCreationCancelModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { toggle } = this.props;
    if (toggle) {
      toggle();
    }
  }

  render() {
    console.log(' cancel modal : ', this.props);
    const { modal, openAccountManagement } = this.props;
    return (
      <div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          backdrop
          // style={{ transition: 'transform 0.11s linear' }}
        >
          <ModalHeader toggle={this.toggle}>Cancel Wallet </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to cancel the create wallet process?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => openAccountManagement()}>
              Yes
            </Button>{' '}
            <Button color="primary" onClick={this.toggle}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AccountCreationCancelModal;
