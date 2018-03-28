import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/UserRowStyle'
import Images from '../Themes/Images'

export default class UserRow extends Component {
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
    return (
      <View style={styles.container}>
        <Image style={styles.profilePicture} source={Images.defaultProfilePicture} />    
        <Text style={styles.headerText}>Victor Lin</Text>
        <TouchableOpacity><Text>Follow</Text></TouchableOpacity>
      </View>
    )
  }
}
