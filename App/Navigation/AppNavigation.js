import { StackNavigator } from 'react-navigation'
import SettingsScreen from '../Containers/SettingsScreen'
import Comments from '../Containers/Comments'
import PostsStream from '../Containers/PostsStream'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'
import SettingsButton from '../Components/SettingsButton'
import React from 'react'


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  // SettingsScreen: { screen: SettingsScreen },
  Comments: { screen: Comments },
  PostsStream: { screen: PostsStream },
}, {
  // Default config for all screens
  initialRouteName: 'PostsStream',

  // The navigation object is passed into options
  // https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
  navigationOptions: ({navigation}) => {
    return {
      title: 'Discuss',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: <SettingsButton onPress={()=> {
        navigation.navigate("Modal")
      }} />
    }
  }
})

// Full screen modal - https://reactnavigation.org/docs/modal.html
const RootStack = StackNavigator(
  {
    Primary: {
      screen: PrimaryNav
    },
    Modal: {
      screen: SettingsScreen
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)


// https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
export default RootStack
