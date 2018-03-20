import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/PostStyle'
import Images from '../Themes/Images'
import Icon from 'react-native-vector-icons/Entypo'

export default class Post extends Component {
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
        <View style={styles.header}>
          <View style={styles.profileBox}>
            <Image style={styles.profilePicture} source={Images.defaultProfilePicture} />
            <Text style={styles.headerText}> Victor Lin </Text>
          </View>
          <Icon style={styles.icon} name="message" size={30} />
        </View>
        <View style={styles.comment}>
          <View style={styles.rating}><Text style={styles.ratingText}> 3 </Text></View>
          <Text style={styles.commentText}>
            This is a test comment. It is long multiline comment.
            Ideally, this would now be on line 2. Great.
          </Text>
        </View>
      </View>
    )
  }
}
