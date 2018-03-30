import { StackNavigator } from 'react-navigation'
import Comments from '../Containers/Comments'
import PostsStream from '../Containers/PostsStream'
import FollowUsersScreen from '../Containers/FollowUsersScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'
// import SettingsButton from '../Components/SettingsButton'
import React from 'react'
import { Button } from 'react-native'
import { DrawerNavigator } from 'react-navigation'

// Accessing the navigation object in navigationOptions
// https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
const navigationOptions = ({navigation}) => {
  return {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
  }
}

// Manifest of possible screens
const FeedbackNav = StackNavigator({
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
    Feedback: {
      screen: FeedbackNav
    },
    FollowUsers: {
      screen: FollowUsersNav
    }
}, {
  initialRouteName: 'FollowUsers',
  drawerWidth: 300
})

export default RootNav
