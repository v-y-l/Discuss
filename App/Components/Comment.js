import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import Images from '../Themes/Images'
import styles from './Styles/CommentStyle'

export default class Comment extends Component {
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
        <Text style={styles.commentBox} >
          <Text style={styles.author}>Victor Lin</Text> 
          <Text style={styles.comment}> This is a very long comment. Very, very, very, very, very, very, very, 
          very, very, very, very, very, very, very, very, very, very, very, very long comment.
          </Text>
        </Text>
      </View>
    )
  }
}
