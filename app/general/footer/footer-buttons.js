

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
    const { onNext } = this.props;
    if(onNext && isActive){
      onNext();
    }
  }

  onBack(event, isActive){
    const { onBack } = this.props;
    if(onBack &&  isActive){
      onBack();
    }
  }
  
  onClose(event, isActive){
    const { onClose } = this.props;
    if(onClose &&  isActive){
      onClose();
    }
  }

 render() {
   return (
     <ul className="form-footer-buttons">
       <li>
         <span className={`${this.props.isCloseActive ? '' : 'disabled'}`}
          style={{ backgroundImage: `url(${cross})`, backgroundRepeat: 'no-repeat' }}
          onClick={(event) => this.onClose(event, this.props.isCloseActive)}>Close</span>
       </li>
       <li>
         <span className={`${this.props.isBackActive ? '' : 'disabled'}`}
          style={{ backgroundImage: `url(${arrowLeft})`, backgroundRepeat: 'no-repeat' }}
          onClick={(event) => this.onBack(event, this.props.isBackActive)}>Back</span>
       </li>
       <li>
         <span aria-hidden className={`${this.props.isNextActive ? '' : 'disabled'}`}
          style={{ backgroundImage: `url(${arrowRight})`, backgroundRepeat: 'no-repeat' }}
           onClick={(event) => this.onNext(event, this.props.isNextActive)}>Next</span>
       </li>
     </ul>

   );
 }
}