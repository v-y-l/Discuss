import { StyleSheet } from 'react-native'
import Fonts from '../../Themes/Fonts'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  profilePicture: {
  	borderRadius: Metrics.profilePicture.borderRadius,
  	height: Metrics.profilePicture.height,
  	width: Metrics.profilePicture.width,
  	marginRight: Metrics.profilePicture.marginRight
  },
  headerText: {
    ...Fonts.style.h5,
  },
})
