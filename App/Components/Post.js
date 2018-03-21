import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styles from './Styles/PostStyle'
import Colors from '../Themes/Colors'
import Images from '../Themes/Images'
import Icon from 'react-native-vector-icons/Entypo'

export default class Post extends Component {
  // // Prop type warnings
  static propTypes = {
    recipient: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numComments: PropTypes.number.isRequired,
    showNumComments: PropTypes.bool
  }

  // // Defaults for props
  static defaultProps = {
    showNumComments: true
  }

  render () {
    const { recipient, text, rating, numComments, showNumComments } = this.props
    const commentNoun = numComments == 1 ? 'comment' : 'comments'
    let ratingColor
    switch(rating) {
      case 1:
        ratingColor = Colors.belowExpectations
        break
      case 2:
        ratingColor = Colors.meetsExpectations
        break
      case 3:
        ratingColor = Colors.exceedsExpectations
        break
      case 4:
        ratingColor = Colors.farExceedsExpectations
        break
      default:
    }
    const ratingBackground = {backgroundColor: ratingColor}

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileBox}>
            <Image style={styles.profilePicture} source={Images.defaultProfilePicture} />
            <Text style={styles.headerText}> { recipient } </Text>
          </View>
          {showNumComments && <Text> {numComments} {commentNoun} <Icon style={styles.icon} name="message" size={30} /> </Text>}
        </View>
        <View style={styles.comment}>
          <View style={[ratingBackground, styles.rating]}><Text style={styles.ratingText}> {rating} </Text></View>
          <Text style={styles.commentText}> {text} </Text>
        </View>
      </View>
    )
  }
}
