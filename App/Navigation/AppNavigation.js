import { StackNavigator } from 'react-navigation'
import Comments from '../Containers/Comments'
import PostsStream from '../Containers/PostsStream'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'
// import SettingsButton from '../Components/SettingsButton'
import React from 'react'
import { Button } from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import FollowUsersScreen from '../Containers/Users'

// Accessing the navigation object in navigationOptions
// https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
const navigationOptions = ({navigation}) => {
  return {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
  }
}

// Manifest of possible screens
const PostsNav = StackNavigator({
  Comments: { screen: Comments },
  PostsStream: { screen: PostsStream },
}, {
  // Default config for all screens
  initialRouteName: 'PostsStream',
  navigationOptions
})

const FollowUsersNav = StackNavigator({
  FollowUsersScreen: { screen: FollowUsersScreen },
}, {
  initialRouteName: 'FollowUsersScreen',
  navigationOptions
})

const RootNav = DrawerNavigator({
    Primary: {
      screen: PostsNav
    },
    Users: {
      screen: FollowUsersNav
    }
}, {
  initialRouteName: 'Primary',
  drawerWidth: 300
})

export default RootNav
