import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button } from 'react-native'
import { connect } from 'react-redux'
import { BlurView } from 'react-native-blur'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SettingsScreenStyle'

class SettingsScreen extends Component {
  render () {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView style={styles.modal} behavior='position'>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
          />
          <Text>SettingsScreen</Text>
          <Button onPress={()=> this.props.navigation.goBack()} title="Dismiss"/>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
