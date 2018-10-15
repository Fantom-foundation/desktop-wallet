/*
 * Progress : Component for displaying progress bar on wallet creation screen.
 * 1. This component is meant for showing progress of wallet creation steps.
 * 2. This component is also meant for showing strength of password for wallet account set by user.
 * 
 * Refresh :  To render animated refresh icon button.
 */

import React from 'react';
import PropTypes from 'prop-types';
import refreshImage from '../../images/icons/refresh.svg';

export const Progress = (props) => {
    let barWidth = 0;
    const { type, value, className } = props;
    if (type === 'strong-password-bar') { barWidth = `${value}%`; }
    if (type === 'theme-blue') { barWidth = `${value}%`; }
    if (type === 'theme-red-Yellow-green') {
        barWidth = 100 - props.value;
        barWidth += '%';
    }
    return (
        <div className={`cs-progress ${className} ${type}`}>
            <div className="bar" style={{ width: barWidth, }}  />
        </div>
    );
}

export const Refresh = (props) => {
    const { className, animated } = props;
return(
    <div className={className}>
        <img src={refreshImage} className={`${animated &&  'rotation anti-clock'}`} alt=""/>
    </div>
);
}
Progress.propTypes = {
 value: PropTypes.number,
 type: PropTypes.string,
 className: PropTypes.string,
  };
  Refresh.propTypes = {
    animated: PropTypes.string,
    className: PropTypes.string,
     };