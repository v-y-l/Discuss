import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import styles from './Styles/AddCommentStyle'
import CommentsActions from '../Redux/CommentsRedux'

class AddComment extends Component {
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

  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
  }

  _onPress = () => {
    this.props.submit(this.state.text, "Fixture User", this.props.postId)
    this.setState({text:""})
    this.blurTextInput()
  }

  addReplyPrefix = (replyToUser) => {
    this.setState({text: `@${replyToUser} `})
    this.focusTextInput()
  }

  focusTextInput = () => {
    this.textInput.focus()
  }

  blurTextInput = () => {
    this.textInput.blur()
  }

  render () {
    const disabled = this.state.text.length === 0
    const { inputRef } = this.props
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70}>
        <View style={styles.container}>
          <TextInput
            ref={(input) => {
              this.textInput = input
              inputRef(this)
            }}
            style={styles.input} 
            autoCorrect={false}
            onChangeText={(text)=> this.setState({text})}
            value={this.state.text}
            placeholder="Add a comment..."
          />
          <TouchableOpacity disabled={disabled} style={styles.button} onPress={this._onPress}>
            <Text style={disabled ? styles.disabledButtonText : styles.buttonText}> Post </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    postId: state.posts.postId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (commentText, commentAuthor, postId) => {
      dispatch(CommentsActions.postCommentRequest(commentText, commentAuthor, postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
