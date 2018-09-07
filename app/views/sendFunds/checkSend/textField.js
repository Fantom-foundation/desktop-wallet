import React, { Component } from 'react';

class TextField extends Component {
  constructor(props) {
    super(props)
    let textValue

    if (this.props.textValue) {
      textValue = this.props.textValue
    }
    this.state = {
      text: textValue
    }
  }


  render() {
    let url = '', rightSideText = '';
    if (this.props.isimagePresent && this.props.imgUrl && this.props.imgUrl !== '') {
      url = this.props.imgUrl;
    }
    if (this.props.isTextPresent && this.props.rightTextValue && this.props.rightTextValue !== '') {
      rightSideText = this.props.rightTextValue
    }

    return (
      <div >
        <input  
          onChange={(text) => this.setState({ text })}
          placeholder={this.props.placeHolderText}
          value={this.props.text}
          placeholderTextColor={'#000'}
          editable={false}
          selectTextOnFocus={false}
          autoCapitalize='none'
        />
        {
          this.props.isimagePresent && 
          <img
            source={url}
            resizeMode='cover'
          />
        }
        {
          this.props.isTextPresent &&
          <div >
            <p  >
              {rightSideText}
            </p>
          </div>
        }
      </div>
    );
  }
}

export default TextField;
