

// import React from 'react';
// import arrowLeft from '../../images/icons/arrow-left.svg';
// import arrowRight from '../../images/icons/arrow-right.svg';
// import cross from '../../images/icons/cross.svg';

// export default class FooterButtons extends React.Component{
//     render()
//     {
//         return (
//             <ul className="form-footer-buttons">
//             <li>
//               <span style={{ backgroundImage: `url(${cross})` }}>Close</span>
//             </li>
//             <li>
//               <span style={{ backgroundImage: `url(${arrowLeft})` }}>Back</span>
//             </li>
//             <li>
//               <span aria-hidden className="disabled" style={{ backgroundImage: `url(${arrowRight})` }} onClick={(event) => this.props.onNext(event)}>Next</span>
//             </li>
//           </ul>

//         );
//     }
// }

import React from 'react';
import arrowLeft from '../../images/icons/arrow-left.svg';
import arrowRight from '../../images/icons/arrow-right.svg';
import cross from '../../images/icons/cross.svg';

export default class FooterButtons extends React.Component {
  onNext(event, isActive){
    if(this.props.onNext && isActive){
      this.props.onNext();
    }
  }
 render() {
   console.log('pppp', this.props);
   return (
     <ul className="form-footer-buttons">
       <li>
         <span style={{ backgroundImage: `url(${cross})`, backgroundRepeat: 'no-repeat' }}>CANCEL</span>
       </li>
       <li>
         <span style={{ backgroundImage: `url(${arrowLeft})`, backgroundRepeat: 'no-repeat' }}>BACK</span>
       </li>
       <li>
         <span aria-hidden className={`${this.props.isActive ? '' : 'disabled'}`} style={{ backgroundImage: `url(${arrowRight})`, backgroundRepeat: 'no-repeat' }} onClick={(event) => this.onNext(event, this.props.isActive)}>NEXT</span>
       </li>
     </ul>

   );
 }
}