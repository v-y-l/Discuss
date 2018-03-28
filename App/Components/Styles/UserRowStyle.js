import { StyleSheet } from 'react-native'
import Fonts from '../../Themes/Fonts'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileBox: {
  	flex: 1,
  	flexDirection: 'row',
    alignItems: 'center',

  },
  profilePicture: {
  	borderRadius: Metrics.profilePicture.borderRadius,
  	height: Metrics.profilePicture.height,
  	width: Metrics.profilePicture.width,
  	marginRight: Metrics.profilePicture.marginRight
  },
  nameText: {
  	paddingLeft: 5,
    ...Fonts.style.h5,
  },
  followButton: {
  	paddingRight: 25,
  }
})
