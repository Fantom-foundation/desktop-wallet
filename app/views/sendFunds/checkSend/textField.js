import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class TextField extends Component {
  render() {
    return (
      <div className="check-send-fields">
        <Row>
          <Col>
            <label>
              <strong>{this.props.placeHolderText}</strong>
            </label>
          </Col>
          <Col className="text-right">
            <label>{this.props.rightTextValue}</label>{' '}
          </Col>
        </Row>
        <div className="form-element-bar" />
      </div>
    );
  }
}

export default TextField;
