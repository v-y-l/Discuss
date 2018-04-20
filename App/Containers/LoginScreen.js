import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

// Styles
import styles from './Styles/LoginScreenStyle';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
              onChangeText={(username)=>this.setState({username})}
              value={this.state.username}
              placeholder="Enter your User ID"
            />
            <TextInput 
              style={styles.loginItem}
              onChangeText={(password)=>this.setState({password})}
              value={this.state.password}
              placeholder="Enter your Password" 
            />
            <TouchableOpacity 
              style={styles.loginButton}
             onPress={()=>{this.props.navigation.navigate("AppScreen");}} >
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
