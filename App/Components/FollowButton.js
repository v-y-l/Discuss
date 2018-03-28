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
    canFollow: true
  }

  render () {
    const { canFollow } = this.props
    let buttonBoxStyle = canFollow ? styles.buttonBoxFollow : styles.buttonBoxFollowed
    let buttonTextStyle = [canFollow ? styles.buttonTextFollow : styles.buttonTextFollowed, styles.buttonBox]
    let buttonText = canFollow ? 'Follow' : 'Following'
    return (
      <TouchableOpacity style={buttonBoxStyle}>
        <Text style={buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    )
  }
}
