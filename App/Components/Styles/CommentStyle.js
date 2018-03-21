import { StyleSheet } from 'react-native'
import Metrics from '../../Themes/Metrics'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: Metrics.item.paddingLeft,
    paddingRight: Metrics.item.paddingRight,
    flexDirection: 'row'
  },
  profilePicture: {
  	borderRadius: Metrics.profilePicture.borderRadius,
  	height: Metrics.profilePicture.height,
  	width: Metrics.profilePicture.width,
  	marginRight: 10
  },
  comment: {
  	flex: 1,
  	...Fonts.style.normal
  }
})
