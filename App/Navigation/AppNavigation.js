import { StackNavigator } from 'react-navigation';

import React from 'react';
import { Button } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import LoginScreen from '../Containers/LoginScreen';
import CommentsScreen from '../Containers/CommentsScreen';
import PostsScreen from '../Containers/PostsScreen';
import FollowUsersScreen from '../Containers/FollowUsersScreen';

import styles from './Styles/NavigationStyles';


// Accessing the navigation object in navigationOptions
// https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
const navigationOptions = ({ navigation }) => ({
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
});

// Manifest of possible screens
const FeedbackNav = StackNavigator({
  Comments: { screen: CommentsScreen },
  Posts: { screen: PostsScreen },
}, {
  // Default config for all screens
  initialRouteName: 'Posts',
  navigationOptions,
});

const FollowUsersNav = StackNavigator({
  FollowUsersScreen: { screen: FollowUsersScreen },
}, {
  initialRouteName: 'FollowUsersScreen',
  navigationOptions,
});

const DrawNav = DrawerNavigator({
  Feedback: {
    screen: FeedbackNav,
  },
  'Follow Users': {
    screen: FollowUsersNav,
  },
  Logout: {
    screen: LoginScreen,
  },
}, {
  initialRouteName: 'Feedback',
  drawerWidth: 300,
});

const RootNav = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  AppScreen: { screen: DrawNav },
}, {
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    header: null,
  },
});

export default RootNav;
