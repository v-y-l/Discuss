import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import styles from './Styles/AddCommentStyle'

const submit = values => {
  console.log('submitting form', values)
}

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput style={styles.input} autoCorrect={false} onChangeText={onChange} value="Add a comment..." {...restInput}  />
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
    const { handleSubmit } = this.props
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
  form: 'AddComment'
})(AddComment)

export default AddComment