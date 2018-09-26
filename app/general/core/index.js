/*
 * Progress : Component for displaying progress bar on wallet creation screen.
 * 1. This component is meant for showing progress of wallet creation steps.
 * 2. This component is also meant for showing strength of password for wallet account set by user.
 * 
 * Refresh :  To render animated refresh icon button.
 */

import React from 'react';
import refreshImage from '../../images/icons/refresh.svg';

export const Progress = (props) => {
    let barWidth = 0;
    if (props.type === 'strong-password-bar') { barWidth = props.value + '%'; }
    if (props.type === 'theme-blue') { barWidth = props.value + '%'; }
    if (props.type === 'theme-red-Yellow-green') {
        barWidth = 100 - props.value;
        barWidth = barWidth + '%';
    }
    return (
        <div className={`cs-progress ${props.className} ${props.type}`}>
            <div className="bar" style={{ width: barWidth, }} ></div>
        </div>
    );
}

export const Refresh = (props) => {
return(
    <div className={props.className}>
        <img src={refreshImage} className={`${props.animated &&  'rotation anti-clock'}`} />
    </div>
);
}