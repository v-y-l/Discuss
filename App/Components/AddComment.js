import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import styles from './Styles/AddCommentStyle';
import CommentsActions from '../Redux/CommentsRedux';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onPress = () => {
    this.props.submit(this.props.postId, this.state.text);
    this.props.clearReplyTo();
    this.setState({ text: '' });
    this.blurTextInput();
  }

  focusTextInput = () => {
    this.textInput.focus();
  }

  blurTextInput = () => {
    this.textInput.blur();
  }

  render() {
    const disabled = this.state.text.length === 0;
    // https://reactjs.org/docs/refs-and-the-dom.html
    // A hack because this is ~probably~ abusing how refs work.
    // Refs are called immediately when a component is mounted or unmounted.
    // Here, we pass the entire component back to the parent via 'addCommentRef'.
    const { addCommentRef } = this.props;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={70}
        ref={() => addCommentRef(this)}
      >
        <View style={styles.container}>
          <TextInput
            ref={(input) => {
              this.textInput = input;
            }}
            style={styles.input}
            autoCorrect={false}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder="Add a comment..."
          />
          <TouchableOpacity disabled={disabled} style={styles.button} onPress={this._onPress}>
            <Text style={disabled ? styles.disabledButtonText : styles.buttonText}> Post </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  postId: state.posts.postId,
  currentUsers: state.currentUsers,
});

const mapDispatchToProps = dispatch => ({
  submit: (postId, commentText) => {
    // Will also reset the comments of the page
    dispatch(CommentsActions.postCommentRequest(postId, commentText));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
