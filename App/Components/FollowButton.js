import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/FollowButtonStyle'

export default class FollowButton extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    following: true
  }

  render () {
    const { following, onPress } = this.props
    let buttonBoxStyle = following ? styles.buttonBoxFollowed : styles.buttonBoxFollow
    let buttonTextStyle = [following ? styles.buttonTextFollowed : styles.buttonTextFollow , styles.buttonBox]
    let buttonText = following ? 'Following' : 'Follow' 
    return (
      <TouchableOpacity style={buttonBoxStyle} onPress={onPress}>
        <Text style={buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    )
  }
}
