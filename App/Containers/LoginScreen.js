import React, { Component } from 'react';
import { ScrollView, Text, KeyboardAvoidingView, Button } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle';

class LoginScreen extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text>LoginScreen</Text>
          <Button title="Login" onPress={()=>{this.props.navigation.navigate("AppScreen");}} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
