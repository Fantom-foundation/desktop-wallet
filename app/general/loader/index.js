import React, {Component} from 'react';
// import { css } from 'react-emotion';
// First way to import
import { ClipLoader } from 'react-spinners';
// Another way to import
 
   

 
class Loader extends Component {
 
  render() {
      const {className, sizeUnit, size, color, loading}  =this.props;
    return (
    //   <div className='sweet-loading'>
        <ClipLoader
          // className={className}
          sizeUnit={sizeUnit}
          size={size}
          color={color}
          loading={loading}
        />
    //   </div> 
    )
  }
}

export default Loader;