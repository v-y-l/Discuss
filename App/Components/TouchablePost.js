import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import Post from './Post'
import styles from './Styles/TouchablePostStyle'

export default class TouchablePost extends Component {
  // Prop type warnings
  static propTypes = {
    recipient: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numComments: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired,
    onPressItem: PropTypes.func.isRequired
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    console.log('touchable')
    console.log(this.props)
    return (
      <TouchableOpacity onPress={()=> this.props.onPressItem(this.props.postId)}> 
        <Post 
          recipient={this.props.recipient} 
          text={this.props.text} 
          rating={this.props.rating} 
          numComments={this.props.numComments} 
        />
      </TouchableOpacity>

    )
  }
}
