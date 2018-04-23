import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import CurrentUserActions from '../Redux/CurrentUserRedux';

// Styles
import styles from './Styles/LoginScreenStyle';

const alert = () => {
  Alert.alert(
    'Incorrect email or password',
    'Please double-check your user id and password combination for any mistakes and try again!',
    [
      {text: 'OK'},
    ],
    { cancelable: false }
  )
}

class LoginScreen extends Component {

  componentDidMount() {
    // Todo: This 'logs you out'. See how FB app does it
    this.props.doLogout();
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.header}>Discuss</Text>
          <View style={styles.loginBox}>
            <TextInput 
              style={styles.loginItem}
              autoCapitalize="none"
              onChangeText={(email)=>this.setState({email})}
              value={this.state.email}
              placeholder="Enter your User ID"
            />
            <TextInput 
              style={styles.loginItem}
              onChangeText={(password)=>this.setState({password})}
              value={this.state.password}
              secureTextEntry={true}
              placeholder="Enter your Password"
            />
            <TouchableOpacity 
              style={styles.loginButton}
              disabled={this.state.email.length == 0 || this.state.password.length == 0}
              onPress={()=>{this.props.doLogin(this.state.email, this.state.password);}} >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  doLogin: (email, password) => dispatch(CurrentUserActions.doLoginRequest(email, password)),
  doLogout: () => dispatch(CurrentUserActions.doLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export { alert };
