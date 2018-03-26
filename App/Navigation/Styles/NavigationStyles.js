import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import { Fonts } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.header,
  },
  headerTitle: {
  	...Fonts.style.h4,
  	color: Colors.headerTitle,
  },
  tintColor: {
  	color: Colors.headerTitle
  }
})
