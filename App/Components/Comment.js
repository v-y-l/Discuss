import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { change, touch } from 'redux-form'
import { connect } from 'react-redux'
import Images from '../Themes/Images'
import styles from './Styles/CommentStyle'

class Comment extends Component {
  // // Prop type warnings
  static propTypes = {
    author: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  _onPress = () => {
    this.props.replyToUser(this.props.author)
  }

  render () {
    const {author, comment} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.commentContainer}>
          <Image style={styles.profilePicture} source={Images.defaultProfilePicture} />
          <Text style={styles.commentBox} >
            <Text style={styles.author}>{author} </Text> 
            <Text style={styles.comment}>{comment}</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.reply} onPress={this._onPress}>
          <Text>
            Reply
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    replyToUser: (user) => {
      // dispatch(touch("newComment","comment"))
      dispatch(change("newComment","comment",`@${user} `))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)