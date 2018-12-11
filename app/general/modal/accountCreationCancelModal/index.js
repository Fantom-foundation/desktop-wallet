import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

/**
 * AccountCreationCancelModal : Component to render account creation cancel modal in reset account and new wallet creation process.
 */
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
    const { modal, openAccountManagement } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle} backdrop>
          <ModalHeader toggle={this.toggle}>Cancel Wallet </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to cancel the create wallet process?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              No
            </Button>
            <Button color="primary" onClick={() => openAccountManagement()}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AccountCreationCancelModal;
