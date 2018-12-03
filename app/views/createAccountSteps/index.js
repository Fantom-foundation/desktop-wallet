import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  // Form,
  // FormGroup,
  // Input,
  Button,
  Container
} from 'reactstrap';
import AppFooter from '../../general/footer/app-footer';

export default class CreateAccountSteps extends Component {
  getClassName() {
    const SELF = this;
    const { stepNo } = SELF.props;
    let className = '';
    if (!stepNo) {
      return className;
    }
    for (let i = 1; i <= stepNo; i += 1) {
      className = className.concat(`t-${i} `);
    }
    return className;
  }

  render() {
    const className = this.getClassName();
    const { restoreAccount, backButtonDisable, nextButtonDisable } = this.props;
    const backButtonDisabled = backButtonDisable ? 'light' : null;
    const nextButtonDisabled = nextButtonDisable ? 'light' : null;
    return (
      <React.Fragment>
        <section style={{ padding: '90px 0px ' }}>
          <Container>
            <Row
              id="account-process"
              className={`${className} ${
                restoreAccount ? 'restore-account' : null
              }`}
            >
              {/* add classes here t-1 t-2 t-3 */}
              <Col className="c-1">
                <svg viewBox="0 0 929.93 683.19" width="929.93" height="683.19">
                  <path d="M726.32,683.19H56.63c-41.66,0-69-43.51-51-81.06l113.42-236a56.55,56.55,0,0,0,0-49L5.65,81.05c-18-37.54,9.32-81,51-81H726.32A76,76,0,0,1,794.8,43.07L922.44,308.69a76,76,0,0,1,0,65.81L794.8,640.12A76,76,0,0,1,726.32,683.19Z" />
                  <g className="ico">
                    <path
                      fill="#fff"
                      d="M476.76,542.18H453.24a27.14,27.14,0,0,0-3.42-.66,196.73,196.73,0,0,1-93.24-31.14c-69-44.19-104.28-126.5-88.63-206.72,8.39-43,28.45-79.72,60.78-109.24,46.52-42.49,101.53-59.44,163.9-51.53,39.64,5,74.55,21.3,104.5,47.74,35.27,31.15,57.33,69.9,65.44,116.37,1.31,7.54,2.07,15.18,3.08,22.77v23.52c-.61,5.15-1.12,10.31-1.84,15.44-5.6,40-21.54,75.32-48.36,105.5-31.07,34.95-69.69,56.77-115.86,64.86C492,540.41,484.37,541.17,476.76,542.18Zm122-85.36c55.61-61.59,64.23-172.35-13.39-244.93a176.17,176.17,0,0,0-256.85,17c-64.82,78.59-43.41,178.9,2.72,227.66,13-45.89,41.88-77.48,86.09-95.41-46.67-33.38-45.61-94.14-14-127.72a84.45,84.45,0,0,1,118.79-4.16c17.6,16.17,26.92,36.53,27.14,60.38.28,29.81-12.42,53.51-36.68,71.38C557,379.06,585.63,410.79,598.8,456.82ZM468.15,518.68c4.08-.34,11.38-.7,18.63-1.58,33.63-4.07,63.51-17.05,89.8-38.34a4.9,4.9,0,0,0,1.49-3.81c-8.94-63.93-68.66-107.72-132-96.91C397,386.41,359.3,425.1,352,474.81a5.25,5.25,0,0,0,1.61,4.1C386.09,505.05,423.28,518.13,468.15,518.68Zm-2.94-166.63c33.55-.18,60.89-27.57,60.77-60.88-.12-33.62-27.67-61.06-61.18-60.93S404,257.85,404,291.18A61.13,61.13,0,0,0,465.21,352.05Z"
                    />
                  </g>
                </svg>
                <h2>Create Account</h2>
              </Col>
              {!restoreAccount ? (
                <Col className="text-center c-2">
                  <svg
                    viewBox="0 0 929.93 683.19"
                    width="929.93"
                    height="683.19"
                  >
                    <path d="M726.32,683.19H56.63c-41.66,0-69-43.51-51-81.06l113.42-236a56.55,56.55,0,0,0,0-49L5.65,81.05c-18-37.54,9.32-81,51-81H726.32A76,76,0,0,1,794.8,43.07L922.44,308.69a76,76,0,0,1,0,65.81L794.8,640.12A76,76,0,0,1,726.32,683.19Z" />
                    <g className="ico">
                      <path
                        d="M442.29,271.92a41.61,41.61,0,0,0,2.2,4c.74,1.1,1.84,2.2,2.57,3.3a32.81,32.81,0,0,0,3.67,3.3,12.08,12.08,0,0,0,4.4,2.2,17.9,17.9,0,0,0,4.77,1.47,22.31,22.31,0,0,0,4.76.37,20.75,20.75,0,0,0,4.77-.37,13,13,0,0,0,4-1.47h.37a27,27,0,0,0,4.4-2.56,24.23,24.23,0,0,0,3.3-2.94l.37-.36a19.91,19.91,0,0,0,2.56-3.3,11.4,11.4,0,0,0,1.84-3.67c0-.37,0-.37.36-.73a23.55,23.55,0,0,0,1.47-4.77,30.93,30.93,0,0,0,0-9.54,33.74,33.74,0,0,0-1.47-4.76,20.62,20.62,0,0,0-4.4-6.6l-.73-.74a31.82,31.82,0,0,0-3.67-2.93c-1.46-.73-2.56-1.47-4-2.2a21.07,21.07,0,0,0-4.4-1.47,23,23,0,0,0-4.77-.36,19.18,19.18,0,0,0-9.17,1.83h-.36a39.79,39.79,0,0,0-4,2.2,32.54,32.54,0,0,0-3.66,2.93,24.23,24.23,0,0,0-2.94,3.3,41.86,41.86,0,0,0-2.2,4,20.28,20.28,0,0,0-1.46,4.4,22.35,22.35,0,0,0-.37,4.77,20.67,20.67,0,0,0,.37,4.76A33.37,33.37,0,0,0,442.29,271.92Z"
                        fill="#fff"
                      />
                      <path
                        d="M493.27,406.13h-8.44V316.29a9.46,9.46,0,0,0-9.53-9.53H436.79a9.46,9.46,0,0,0-9.53,9.53v19.8a9.47,9.47,0,0,0,9.53,9.54h7.7V406.5h-7.7a9.47,9.47,0,0,0-9.53,9.54v19.8a9.46,9.46,0,0,0,9.53,9.53h56.48a9.46,9.46,0,0,0,9.53-9.53V416A9.79,9.79,0,0,0,493.27,406.13Z"
                        fill="#fff"
                      />
                      <path
                        d="M465,141c-110.75,0-200.59,89.84-200.59,200.58S354.28,542.18,465,542.18s200.59-89.84,200.59-200.59S575.77,141,465,141Zm0,374.77c-96.08,0-174.19-78.11-174.19-174.19S369,167.41,465,167.41s174.18,78.11,174.18,174.18S561.11,515.78,465,515.78Z"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                  <h2>Account Information</h2>
                </Col>
              ) : null}
              <Col className={`text-right ${restoreAccount ? 'c-2' : 'c-3'}`}>
                <svg viewBox="0 0 929.93 683.19" width="929.93" height="683.19">
                  <path d="M726.32,683.19H56.63c-41.66,0-69-43.51-51-81.06l113.42-236a56.55,56.55,0,0,0,0-49L5.65,81.05c-18-37.54,9.32-81,51-81H726.32A76,76,0,0,1,794.8,43.07L922.44,308.69a76,76,0,0,1,0,65.81L794.8,640.12A76,76,0,0,1,726.32,683.19Z" />
                  <g className="ico">
                    <path
                      fill="#fff"
                      d="M464.48,141.15c-110.11,0-200.2,90.2-200.2,200.44S354.37,542,464.48,542s200.2-90.2,200.2-200.45S574.59,141.15,464.48,141.15Zm0,375.83c-96.35,0-175.18-78.92-175.18-175.39S368.13,166.2,464.48,166.2s175.17,78.93,175.17,175.39S560.83,517,464.48,517Z"
                    />
                    <path
                      fill="#fff"
                      d="M543.31,282.71l-103.86,104L386.9,334.08a12.4,12.4,0,0,0-17.52,17.54L430.7,413a12.07,12.07,0,0,0,17.51,0L560.83,300.25a12.4,12.4,0,0,0-17.52-17.54Z"
                    />
                  </g>
                </svg>
                <h2>Confirm</h2>
              </Col>
              <div className="process-bar">
                <div className="holder">
                  <span className="element e-1" />
                  <span className="element e-2" />
                  {!restoreAccount ? (
                    <React.Fragment>
                      <span className="element e-3" />
                      <span className="element e-4" />
                    </React.Fragment>
                  ) : null}
                </div>
              </div>
            </Row>
          </Container>
        </section>

        {this.props.children}
        <section style={{ padding: '40px 0' }}>
          <Container>
            <Row className="back-next-btn">
              <Col className="text-right">
                <Button
                  // onClick={event => this.onBack(event, isBackActive)}
                  onClick={this.props.onPrev}
                  className={backButtonDisabled}
                >
                  <i className="fas fa-chevron-left" /> Back
                </Button>
              </Col>
              <Col>
                <Button
                  className={nextButtonDisabled}
                  // onClick={event => this.onNext(event, isNextActive)}>
                  onClick={this.props.onNext}
                >
                  Next <i className="fas fa-chevron-right" />
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
        <AppFooter />
      </React.Fragment>
    );
  }
}
CreateAccountSteps.propTypes = {
  restoreAccount: PropTypes.bool
};

CreateAccountSteps.defaultProps = {
  restoreAccount: false
};
