import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
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
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70}>
        <View style={styles.container}>
          <TextInput style={styles.input} autoCorrect={false} value="Add a comment..." />
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}> Post </Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
