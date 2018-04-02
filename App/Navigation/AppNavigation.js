import { StackNavigator } from 'react-navigation'
import Comments from '../Containers/Comments'
import PostsScreen from '../Containers/PostsScreen'
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
  PostsScreen: { screen: PostsScreen },
}, {
  // Default config for all screens
  initialRouteName: 'PostsScreen',
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
  initialRouteName: 'Feedback',
  drawerWidth: 300
})

export default RootNav
