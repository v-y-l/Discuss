import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MenuButton from '../Components/MenuButton'

// Styles
import styles from './Styles/UsersScreenStyle'

class UsersScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Users',
      headerLeft: <MenuButton onPress={()=>{navigation.navigate("DrawerOpen")}} />
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>UsersScreen</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen)
