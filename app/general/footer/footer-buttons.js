import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'reactstrap';

/**
 * FooterButtons :  This component is meant for rendering Buttons on footer of each screen of wallet setup.
 *
 * onNext() : Trigger event to move to next screen , when clicked on 'Next' button. This button is clickable only if it is 'Active'.
 * onBack() : Trigger event to move to previous screen, when clicked on 'Back' button. This button is clickable only if it is 'Active'.
 * onClose() : Trigger event to close the screen, when clicked on 'Close' button. This button is clickable only if it is 'Active'.
 *
 */

export default class FooterButtons extends Component {
  onNext(event, isActive) {
    const { onNext } = this.props;
    if (onNext && isActive) {
      onNext();
    }
  }

  onBack(event, isActive) {
    const { onBack } = this.props;
    if (onBack && isActive) {
      onBack();
    }
  }

  onClose(event, isActive) {
    const { onClose } = this.props;
    if (onClose && isActive) {
      onClose();
    }
  }

  render() {
    const { isBackActive, isNextActive } = this.props;
    return (
      <React.Fragment>
        <section style={{ padding: '40px 0' }}>
          <Container>
            <Row className="back-next-btn">
              <Col className="text-right">
                <Button
                  onClick={event => this.onBack(event, isBackActive)}
                  className="light"
                >
                  <i className="fas fa-chevron-left" /> Back
                </Button>
              </Col>
              <Col>
                <Button onClick={event => this.onNext(event, isNextActive)}>
                  Next <i className="fas fa-chevron-right" />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
        }
      </React.Fragment>
    );
  }
}
FooterButtons.propTypes = {
  isBackActive: PropTypes.bool,
  isNextActive: PropTypes.bool,
  onNext: PropTypes.func,
  onClose: PropTypes.func,
  onBack: PropTypes.func
};
