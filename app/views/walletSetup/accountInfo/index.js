import React, { Component } from 'react';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

import { clipboard } from 'electron';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import AccountInfoCard from './accountInfoCard';

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmText: 'I have written down the phrase',
      confirmationPhrase: '',
      revealSecret: ''
    };
  }

  onNext() {
    const { confirmText, confirmationPhrase } = this.state;
    const { toggle } = this.props;
    if (confirmText === confirmationPhrase) {
      if (toggle) {
        toggle('3');
      }
    }
  }

  onBack() {
    if (this.props.toggle) {
      this.props.toggle('1');
    }
  }

  onUpdate(e) {
    const text = e.target.value;
    this.setState(
      {
        confirmationPhrase: text
      },
      () => {
        this.props.changeDisableButtons();
      }
    );
  }

  changeSecret = () => {
    this.setState({ revealSecret: true }, () =>
      this.props.changeDisableButtons()
    );
  };

  confirmPhraseBackup(e) {
    const confirmText = e.target.value.trim();
    this.setState({
      confirmText
    });
  }

  copyToClipboard(copyText) {
    clipboard.writeText(copyText);

    toastr.success('Copied to clipboard', '', { timeOut: 3000 });
  }

  copyMnemonic(copyText) {
    this.copyToClipboard(copyText);
  }

  copyAddress(copyText) {
    this.copyToClipboard(copyText);
  }

  render() {
    const CONFIRMATION_PHASE = 'I have written down the phrase';
    const { confirmationPhrase, revealSecret } = this.state;
    const {
      accountName,
      mnemonic,
      identiconsId,
      address,
      activeTab
    } = this.props;
    if (activeTab !== '2') {
      return null;
    }
    return (
      <section
        id="account-information"
        className="bg-dark"
        style={{ padding: '40px 0 70px' }}
      >
        <AccountInfoCard
          ref={component => {
            this.accountRef = component;
          }}
          accountName={accountName}
          mnemonic={mnemonic}
          address={address}
          revealSecret={revealSecret}
          identiconsId={identiconsId}
          changeSecret={this.changeSecret}
          copyAddress={this.copyAddress.bind(this)}
          copyMnemonic={this.copyMnemonic.bind(this)}
          changeDisableButtons={this.props.changeDisableButtons}
        />

        <Container className="acc-footer">
          <Row>
            <Col>
              <p className="text-white">
                Please back up the recovery phrase now. Make sure to keep it
                private and secure, it allows full and unlimited access to your
                account and can be used to restore your wallet.
              </p>
              <FormGroup>
                <Label for="msg" className="text-white">
                  Type{' '}
                  <span className="text-primary">
                    {'"'}
                    {CONFIRMATION_PHASE}
                    {'" '}
                  </span>
                  below to confirm it is backed up.
                </Label>
                <div className="input-holder">
                  <Input
                    type="text"
                    name="msg"
                    required=""
                    onChange={e => this.onUpdate(e)}
                    id="msg"
                    value={confirmationPhrase}
                    autoFocus={false}
                  />
                  <i className="fas fa-pencil-alt" />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  accountName: state.createAccountReducer.accountName,
  identiconsId: state.createAccountReducer.accountIcon,
  address: state.keyReducer.publicKey,
  mnemonic: state.keyReducer.mnemonic
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(AccountInfo);
