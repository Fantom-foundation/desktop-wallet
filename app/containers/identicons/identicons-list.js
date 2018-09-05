import React from 'react';
import  Identicons  from './identicons';

export default class IdenticonsIcon extends React.Component {
  getRadioIconData(identiconsId){
    if(this.props.getRadioIconData){
      this.props.getRadioIconData(identiconsId);
    }
  }
  
  render() {
    const index = this.props.index.toString();
    const date = this.props.date.toString();
    let identiconsId = index + date;
    return (
      <li>
        <label className="form-radio-label">
          <input name="name" className="form-radio-field" type="radio" value={identiconsId} onClick={() => this.getRadioIconData(identiconsId)}/>          
          <i className="form-radio-button"></i>
          <div className="d-inline-block theme-blue-shadow identicon-boxes-container" >
            <Identicons id={identiconsId} width={40} size={3} />
          </div>
        </label>
      </li>
    );
  }
}
