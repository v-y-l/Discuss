import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/UserRowStyle'
import Images from '../Themes/Images'
import FollowButton from '../Components/FollowButton'

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
        <View style={styles.profileBox}>
          <Image style={styles.profilePicture} source={Images.defaultProfilePicture} />    
          <Text style={styles.nameText}>Victor Lin</Text>
        </View>
        <View style={styles.followButton}>
          <FollowButton />
        </View>
      </View>
    )
  }
}