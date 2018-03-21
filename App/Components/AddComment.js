import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, KeyboardAvoidingView, TextInput, Button } from 'react-native'
import styles from './Styles/AddCommentStyle'

export default class AddComment extends Component {
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={70}>
        <TextInput style={styles.input} autoCorrect={false} value="Add a comment..." />
        <Button style={styles.button} title="Post" />
      </KeyboardAvoidingView>
    )
  }
}
