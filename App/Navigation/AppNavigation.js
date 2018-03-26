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
  SettingsScreen: { screen: SettingsScreen },
  Comments: { screen: Comments },
  PostsStream: { screen: PostsStream },
}, {
  // Default config for all screens
  initialRouteName: 'PostsStream',

  // https://github.com/react-navigation/react-navigation/issues/1789
  navigationOptions: ({navigation}) => {
    return {
      title: 'Discuss',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: <SettingsButton onPress={()=> {
        navigation.navigate("SettingsScreen")
      }} />
    }
  }
})


// https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
export default PrimaryNav
