import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { Field, reduxForm, blur, untouch } from 'redux-form'
import styles from './Styles/AddCommentStyle'
import CommentsActions from '../Redux/CommentsRedux'

class Input extends Component {
  render() {
    const { input: { onChange, ...restInput }} = this.props
    return <TextInput
      ref="input"
      style={styles.input} 
      autoCorrect={false} 
      onChangeText={onChange} 
      placeholder="Add a comment..." 
      {...restInput}  />
  }
}

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

  //https://github.com/erikras/redux-form/issues/1933 Accessing 


  render () {


    const submit = values => {
      this.props.dispatchSubmit(values.comment, "Fixture User", this.props.postId)
      let input = this.refs.commentInput.getRenderedComponent().refs.input
      input.clear()
      input.blur()
    }

    const { handleSubmit } = this.props //Middle-layer for your own custom submit: https://redux-form.com/7.1.0/docs/faq/handlevson.md/
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70}>
        <View style={styles.container}>
          <Field ref="commentInput" withRef={true} name="comment" component={Input} />
          <TouchableOpacity style={styles.button} onPress={handleSubmit(submit)}><Text style={styles.buttonText}> Post </Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

AddComment = reduxForm({
  form: 'newComment'
})(AddComment)

const mapStateToProps = (state) => {
  return {
    postId: state.posts.postId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSubmit: (commentText, commentAuthor, postId) => {
      dispatch(CommentsActions.postCommentRequest(commentText, commentAuthor, postId))
      dispatch(blur("newComment","comment","")) //https://redux-form.com/6.0.0-alpha.4/docs/api/actioncreators.md/
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
