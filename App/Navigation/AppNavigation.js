import { StackNavigator } from 'react-navigation'
import Comments from '../Containers/Comments'
import PostsStream from '../Containers/PostsStream'
import LaunchScreen from '../Containers/LaunchScreen'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles/NavigationStyles'
import Icon from 'react-native-vector-icons/Ionicons'


class SettingsButton extends React.Component {
	render() {
		return <TouchableOpacity style={styles.settingsButton} onPress={()=>{console.log("settingsPressed")}}> 
			<Icon size={30} color="#ffffff" name="ios-settings" />
		</TouchableOpacity>
	}
}

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Comments: { screen: Comments },
  PostsStream: { screen: PostsStream },
}, {
  // Default config for all screens
  initialRouteName: 'PostsStream',
  // https://reactnavigation.org/docs/stack-navigator.html#navigationoptions-used-by-stacknavigator
  navigationOptions: {
  	title: 'Discuss',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerRight: <SettingsButton /> 
  }
})

export default PrimaryNav
