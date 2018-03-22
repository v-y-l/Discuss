import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { Field, reduxForm, reset, blur, untouch } from 'redux-form'
import styles from './Styles/AddCommentStyle'
import CommentsActions from '../Redux/CommentsRedux'

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput style={styles.input} autoCorrect={false} onChangeText={onChange} placeholder="Add a comment..." {...restInput}  />
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

  render () {
    const submit = values => {
      this.props.dispatchSubmit(values.comment, "Fixture User", this.props.postId)
    }

    const { handleSubmit } = this.props //Middle-layer for your own custom submit: https://redux-form.com/7.1.0/docs/faq/handlevson.md/
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70}>
        <View style={styles.container}>
          <Field name="comment" component={renderInput} />
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
      console.log(blur("newComment","comment",""))
      dispatch(blur("newComment","comment","")) //https://redux-form.com/6.0.0-alpha.4/docs/api/actioncreators.md/
      dispatch(untouch("newComment","comment")) //need to figure out a way to mark form as inactive
      // dispatch(reset("newComment")) //https://redux-form.com/6.0.0-alpha.4/docs/faq/howtoclear.md/
      dispatch(CommentsActions.postCommentRequest(commentText, commentAuthor, postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
