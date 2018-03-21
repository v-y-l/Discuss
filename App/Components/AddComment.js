import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native'
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
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} />
        </KeyboardAvoidingView>
      </View>
    )
  }
}
