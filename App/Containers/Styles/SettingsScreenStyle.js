import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics } from '../../Themes/'


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingTop: Metrics.baseMargin,
  	paddingLeft: Metrics.baseMargin,
  	justifyContent: 'center',
  	alignItems: 'center',
  	flex: 1
  },
  absolute: {
  	position: 'absolute',
  	top:0,
  	left:0,
  	right:0,
  	bottom:0
  }
})
