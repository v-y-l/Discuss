import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './Styles/SettingsButtonStyle'
import Icon from 'react-native-vector-icons/Ionicons'

export default class SettingsButton extends Component {
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

  render() {
    const { onPress } = this.props
    return <TouchableOpacity 
      style={styles.settingsButton} 
      onPress={onPress}
    > 
      <Icon size={30} color="#ffffff" name="ios-settings" />
    </TouchableOpacity>
  }
}
