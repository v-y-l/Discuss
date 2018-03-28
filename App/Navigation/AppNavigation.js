import { StackNavigator } from 'react-navigation'
import SettingsScreen from '../Containers/SettingsScreen'
import Comments from '../Containers/Comments'
import PostsStream from '../Containers/PostsStream'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'
// import SettingsButton from '../Components/SettingsButton'
import React from 'react'
import { Button } from 'react-native'
import { DrawerNavigator } from 'react-navigation'
import Users from '../Containers/Users'

// The navigation object is passed into options
// https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
const navigationOptions = ({navigation}) => {
  return {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
  }
}

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Comments: { screen: Comments },
  PostsStream: { screen: PostsStream },
}, {
  // Default config for all screens
  initialRouteName: 'PostsStream',
  navigationOptions
})

const UsersNav = StackNavigator({
  Users: { screen: Users },
}, {
  initialRouteName: 'Users',
  navigationOptions
})

const RootNav = DrawerNavigator({
    Primary: {
      screen: PrimaryNav
    },
    Users: {
      screen: UsersNav
    }
}, {
  initialRouteName: 'Primary',
  drawerWidth: 300
})

//Screen fade in and fade out animation
//https://github.com/react-navigation/react-navigation/issues/2493
// const fade = (props) => {
//     const {position, scene} = props

//     const index = scene.index

//     const translateX = 0
//     const translateY = 0

//     const opacity = position.interpolate({
//         inputRange: [index - 0.7, index, index + 0.7],
//         outputRange: [0.3, 1, 0.3]
//     })

//     return {
//         opacity,
//         transform: [{translateX}, {translateY}]
//     }
// }

// Full screen modal - https://reactnavigation.org/docs/modal.html
// const RootStack = StackNavigator(
//   {
//     Primary: {
//       screen: PrimaryNav
//     },
//     Modal: {
//       screen: SettingsScreen
//     },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//     transitionConfig: () => ({
//         screenInterpolator: (props) => {
//             return fade(props)
//         }
//     })
//   }
// )


// https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
// export default RootStack
export default RootNav
