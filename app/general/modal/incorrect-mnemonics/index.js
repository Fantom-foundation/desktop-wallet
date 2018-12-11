import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/**
 * IncorrectMnemonicsModal : Component to render warning modal in new wallet creation process for incorrect mnemonics.
 */
export default class IncorrectMnemonicsModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      openIncorrectMnemonicsModal,
      toggleIncorrectMnemonicsModal
    } = this.props;
    return (
      <Modal
        isOpen={openIncorrectMnemonicsModal}
        toggle={toggleIncorrectMnemonicsModal}
      >
        <ModalHeader toggle={toggleIncorrectMnemonicsModal}>
          Incorrect Mnemonics
        </ModalHeader>
        <ModalBody>
          <p>The mnemonics that you entered are incorrect.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleIncorrectMnemonicsModal}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
