import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import styles from './Styles/MenuButtonStyle'

export default class MenuButton extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const { onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon size={30} color="#ffffff" name="menu" />
      </TouchableOpacity>
    )
  }
}
