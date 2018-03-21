import { StyleSheet } from 'react-native'
import Fonts from '../../Themes/Fonts'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: Metrics.item.paddingLeft,
    paddingRight: Metrics.item.paddingRight,
  },
  //header
  header: {
  	flex: 1,
  	flexDirection: "row",
  	justifyContent: "space-between",
  	alignItems: "center",
  	paddingBottom: 10,
  	marginBottom: 10,
  	borderBottomWidth: 2,
  	borderColor: Colors.separator
  },
  profileBox: { 
  	flexDirection: "row",
  	alignItems: "center",
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
  icon: {
  	color: "#000000",
  },
  //comment
  comment: {
  	flex: 1,
  	flexDirection: "row",
  	paddingRight: 10
  },
  commentText: {
  	marginLeft: 10,
  	flex: 1,
    ...Fonts.style.normal,	
  },
  rating: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	height: 26,
  	width: 26,
  	borderRadius: 13,
  	paddingRight: 4,
  },
  ratingText: {
    ...Fonts.style.normal,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1
  }

})
