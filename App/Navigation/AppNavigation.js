import { StackNavigator } from 'react-navigation'
import PostsStream from '../Containers/PostsStream'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  PostsStream: { screen: PostsStream },
}, {
  // Default config for all screens
  initialRouteName: 'PostsStream',
  navigationOptions: {
  	title: 'Discuss',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
  }
})

export default PrimaryNav
