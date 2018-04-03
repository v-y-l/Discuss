import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import styles from './Styles/AddCommentStyle'
import CommentsActions from '../Redux/CommentsRedux'
import PostsActions from '../Redux/PostsRedux'
import CurrentUserActions, { CurrentUserSelectors } from '../Redux/CurrentUserRedux'

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
    this.props.submit(this.state.text, this.props.postId)
    this.props.clearReplyTo()
    this.setState({text:""})
    this.blurTextInput()
  }

  focusTextInput = () => {
    this.textInput.focus()
  }

  blurTextInput = () => {
    this.textInput.blur()
  }

  render () {
    const disabled = this.state.text.length === 0
    //https://reactjs.org/docs/refs-and-the-dom.html
    //A hack because this is ~probably~ abusing how refs work.
    //Refs are called immediately when a component is mounted or unmounted.
    //Here, we pass the entire component back to the parent via 'addCommentRef'.
    const { addCommentRef } = this.props
    return (
      <KeyboardAvoidingView 
        behavior="padding" 
        keyboardVerticalOffset={70}
        ref={() => addCommentRef(this)}
        >
        <View style={styles.container}>
          <TextInput
            ref={(input) => {
              this.textInput = input
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
    postId: state.posts.postId,
    currentUsers: state.currentUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (commentText, commentAuthor, postId) => {
      dispatch(CommentsActions.postCommentRequest(postId, commentText))
      dispatch(CommentsActions.resetComments())
      dispatch(CommentsActions.getCommentsRequest(postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
