import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

/**
 * TextField : A generic component for rendering text field in check send screen.
 */
class TextField extends Component {
  render() {
    return (
      <Row>
        <Col>
          <label className="title">{this.props.placeHolderText}</label>
        </Col>
        <Col className="text-right">
          <label>{this.props.rightTextValue || 20}</label>
        </Col>
      </Row>
    );
  }
}

export default TextField;
