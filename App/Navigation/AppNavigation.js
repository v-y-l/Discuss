import { StackNavigator } from 'react-navigation'
import PostsStream from '../Containers/PostsStream'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  PostsStream: { screen: PostsStream },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PostsStream',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
