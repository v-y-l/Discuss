import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  buttonBox: {
  	padding: 8,
  },
  buttonBoxFollow: {
  	backgroundColor: Colors.appColor,
  },
  buttonBoxFollowed: {
  	borderWidth: 2,
  	borderColor: Colors.separator
  },
  buttonTextFollow: {
  	color: '#ffffff'
  },
  buttonTextFollowed: {
  	color: '#000000'
  }
})
