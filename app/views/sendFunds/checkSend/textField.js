import React, { Component } from 'react';
import { Input } from 'reactstrap';

class TextField extends Component {
  render() {
    return (
      <div >
        <label >{this.props.placeHolderText}</label>
        <label style={{color: 'green'}}>{this.props.rightTextValue}</label>                              
        <div className="form-element-bar"></div>
      </div>
    );
  }
}

export default TextField;
