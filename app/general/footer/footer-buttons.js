import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrowLeft from '../../images/icons/arrow-left.svg';
import arrowRight from '../../images/icons/arrow-right.svg';
import cross from '../../images/icons/cross.svg';
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
    const { isCloseActive, isBackActive, isNextActive } = this.props;
    return (
      <ul className="form-footer-buttons">
        <li>
          <span
            aria-hidden
            className={`${isCloseActive ? '' : 'disabled'}`}
            style={{
              backgroundImage: `url(${cross})`,
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer'
            }}
            onClick={event => this.onClose(event, isCloseActive)}
          >
            Close
          </span>
        </li>
        <li>
          <span
            aria-hidden
            className={`${isBackActive ? '' : 'disabled'}`}
            style={{
              backgroundImage: `url(${arrowLeft})`,
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer'
            }}
            onClick={event => this.onBack(event, isBackActive)}
          >
            Back
          </span>
        </li>
        <li>
          <span
            aria-hidden
            className={`${isNextActive ? '' : 'disabled'}`}
            style={{
              backgroundImage: `url(${arrowRight})`,
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={event => this.onNext(event, isNextActive)}
          >
            Next
          </span>
        </li>
      </ul>
    );
  }
}
FooterButtons.propTypes = {
  isCloseActive: PropTypes.bool,
  isBackActive: PropTypes.bool,
  isNextActive: PropTypes.bool,
  onNext: PropTypes.func,
  onClose: PropTypes.func,
  onBack: PropTypes.func
};
