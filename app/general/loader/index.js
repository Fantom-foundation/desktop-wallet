import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
 
/**
 * Loader :  This component is meant for rendering loader on screen.
 * 
 * sizeUnit: To set units of size of loader, 
 * size: To set size of loader, 
 * color: To set color of loader, 
 * loading: To set loading is enable or disableed.
 */
class Loader extends Component {
  render() {
      const {sizeUnit, size, color, loading}  =this.props;
    return (
        <ClipLoader
          sizeUnit={sizeUnit}
          size={size}
          color={color}
          loading={loading}
        />
    )
  }
}

Loader.propTypes = {
  sizeUnit: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  loading: PropTypes.bool,
};

export default Loader;

