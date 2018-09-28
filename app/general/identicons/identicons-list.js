import React,{Component} from 'react';
import PropTypes from 'prop-types';

import  Identicons  from './identicons';

/**
 * IdenticonsIcon :  This component is meant for rendering IdenticonsIcon list in create account screen of wallet setup. 
 */

export default class IdenticonsIcon extends Component {

  /**
   * getRadioIconData() : Function to handle selected Identicon, from list of icons.
   * @param {string} identiconsId 
   */
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

/**
 * Custom setting props to be passed for Header display changes:
 *
 * accountIcon: Selected account icon for wallet account.
 * index: Index of selected icon from list.
 * date:  Constant string for creating a Identicons.
 * 
 */

IdenticonsIcon.propTypes = {
  accountIcon: PropTypes.string,
  index: PropTypes.number,
  date: PropTypes.number,
};

IdenticonsIcon.defaultProps = {
  date: '00000',
};

