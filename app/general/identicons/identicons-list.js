import React,{Component} from 'react';
import  Identicons  from './identicons';

export default class IdenticonsIcon extends Component {

  getRadioIconData(identiconsId){
    const {getRadioIconData} = this.props;
    if(getRadioIconData){
      getRadioIconData(identiconsId);
    }
  }
  
  render() {
    const index = this.props.index.toString();
    const date = this.props.date.toString();
    const identiconsId = index + date;
    const {accountIcon} = this.props;
    let checked = false;
    if(accountIcon && (accountIcon === identiconsId)){
      checked = true;
    }
    return (
      <li>
        <label className="form-radio-label">
          <input name="name" className="form-radio-field" type="radio" checked={checked} onClick={() => this.getRadioIconData(identiconsId)}/>          
          <i className="form-radio-button" />
          <div className="d-inline-block theme-blue-shadow identicon-boxes-container" >
            <Identicons id={identiconsId} width={40} size={3} />
          </div>
        </label>
      </li>
    );
  }
}
