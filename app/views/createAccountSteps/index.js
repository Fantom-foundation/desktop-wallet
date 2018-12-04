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
        <section style={{ padding: '30px 0px ' }}>
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
                      d="M472.1,462.5h-14.2c-0.7-0.2-1.4-0.3-2.1-0.4c-20-1.4-39.3-7.9-56.2-18.8c-41.6-26.6-62.8-76.2-53.4-124.6
                      c5.1-25.9,17.1-48,36.6-65.8c28-25.6,61.2-35.8,98.7-31.1c23.9,3,44.9,12.8,62.9,28.8c21.2,18.8,34.5,42.1,39.4,70.1
                      c0.8,4.5,1.2,9.1,1.9,13.7v14.2c-0.4,3.1-0.7,6.2-1.1,9.3c-3.4,24.1-13,45.4-29.1,63.6c-18.7,21.1-42,34.2-69.8,39.1
                      C481.2,461.4,476.7,461.9,472.1,462.5z M545.6,411c33.5-37.1,38.7-103.9-8.1-147.6c-42.8-40.1-109.9-37.9-150,4.9
                      c-1.6,1.7-3.2,3.5-4.7,5.4c-39,47.4-26.1,107.8,1.6,137.2c7.8-27.7,25.2-46.7,51.9-57.5c-28.1-20.1-27.5-56.7-8.4-77
                      c19.1-20.3,51.1-21.4,71.6-2.5c10.6,9.7,16.2,22,16.3,36.4c0.2,18-7.5,32.2-22.1,43C520.4,364.2,537.6,383.3,545.6,411L545.6,411z
                       M466.9,448.3c2.5-0.2,6.9-0.4,11.2-1c20.3-2.5,38.3-10.3,54.1-23.1c0.6-0.6,0.9-1.4,0.9-2.3c-5.4-38.5-41.4-64.9-79.5-58.4
                      c-29.6,5-52.3,28.4-56.7,58.3c-0.1,0.9,0.3,1.8,1,2.5C417.5,440.1,439.9,448,466.9,448.3z M465.1,347.9
                      c20.2-0.1,36.7-16.6,36.6-36.7c-0.1-20.3-16.7-36.8-36.9-36.7c-20.2,0.1-36.6,16.6-36.6,36.7C428.3,331.5,444.8,347.9,465.1,347.9z
                      "
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
                        fill="#fff"
                        d="M449.6,294.2c0.4,0.9,0.9,1.8,1.5,2.7c0.5,0.7,1.3,1.5,1.7,2.2c0.8,0.8,1.6,1.6,2.5,2.2c0.9,0.7,1.9,1.2,3,1.5
		c1,0.5,2.1,0.8,3.2,1c1.1,0.2,2.2,0.3,3.2,0.3c1.1,0,2.2,0,3.2-0.3c1-0.2,1.9-0.5,2.7-1h0.3c1-0.5,2.1-1.1,3-1.7
		c0.8-0.6,1.6-1.3,2.2-2l0.3-0.2c0.7-0.7,1.2-1.4,1.7-2.2c0.6-0.7,1-1.6,1.3-2.5c0-0.3,0-0.3,0.2-0.5c0.4-1,0.8-2.1,1-3.2
		c0.3-2.1,0.3-4.3,0-6.5c-0.3-1.1-0.6-2.2-1-3.2c-0.7-1.7-1.7-3.2-3-4.5l-0.5-0.5c-0.8-0.7-1.6-1.4-2.5-2c-1-0.5-1.7-1-2.7-1.5
		c-1-0.4-2-0.8-3-1c-1.1-0.2-2.2-0.3-3.2-0.2c-2.1-0.1-4.3,0.3-6.2,1.2h-0.2c-0.9,0.4-1.8,0.9-2.7,1.5c-0.9,0.6-1.7,1.3-2.5,2
		c-0.7,0.7-1.4,1.4-2,2.2c-0.5,0.9-1,1.8-1.5,2.7c-0.4,1-0.8,2-1,3c-0.2,1.1-0.3,2.2-0.3,3.2c0,1.1,0,2.2,0.3,3.2
		C448.8,291.6,449.1,292.9,449.6,294.2z"
                      />
                      <path
                        fill="#fff"
                        d="M484.2,385.5h-5.7v-61.1c0-3.6-2.8-6.5-6.4-6.5c0,0-0.1,0-0.1,0h-26.2c-3.6,0-6.5,2.8-6.5,6.4c0,0,0,0.1,0,0.1
		v13.5c0,3.6,2.8,6.5,6.4,6.5c0,0,0.1,0,0.1,0h5.2v41.4h-5.2c-3.6,0-6.5,2.8-6.5,6.4c0,0,0,0.1,0,0.1v13.5c0,3.6,2.8,6.5,6.4,6.5
		c0,0,0.1,0,0.1,0h38.4c3.6,0,6.5-2.8,6.5-6.4c0,0,0-0.1,0-0.1v-13.5C490.7,388.5,487.8,385.6,484.2,385.5z"
                      />
                      <path
                        fill="#fff"
                        d="M465,205.2c-75.3,0-136.3,61.1-136.3,136.3S389.7,477.9,465,477.9s136.3-61.1,136.3-136.3
		S540.3,205.2,465,205.2z M465,460c-65.3,0-118.4-53.1-118.4-118.4S399.7,223.2,465,223.2s118.4,53.1,118.4,118.4S530.3,460,465,460
		L465,460z"
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
                      d="M464.5,224.9c-64.1,0-116.6,52.5-116.6,116.7s52.5,116.7,116.6,116.7S581,405.7,581,341.6
		S528.6,224.9,464.5,224.9z M464.5,443.7c-56.1,0-102-45.9-102-102.1s45.9-102.1,102-102.1s102,46,102,102.1
		S520.6,443.7,464.5,443.7L464.5,443.7z"
                    />
                    <path
                      fill="#fff"
                      d="M510.4,307.3l-60.5,60.5l-30.6-30.6c-2.9-2.7-7.5-2.6-10.2,0.3c-2.6,2.8-2.6,7.2,0,9.9l35.7,35.7
		c2.7,2.8,7.1,2.9,9.9,0.3c0.1-0.1,0.2-0.2,0.3-0.3l65.6-65.6c2.7-2.9,2.6-7.5-0.3-10.2C517.5,304.7,513.2,304.7,510.4,307.3z"
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
