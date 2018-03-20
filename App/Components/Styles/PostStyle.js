import { StyleSheet } from 'react-native'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 10,
  },
  //header
  header: {
  	flex: 1,
  	flexDirection: "row",
  	justifyContent: "space-between",
	alignItems: "center",
  	paddingBottom: 10,
  	marginBottom: 10,
  	borderBottomWidth: 1,
  	borderColor: "#E0E0E0"
  },
  profileBox: { 
  	flexDirection: "row",
  	alignItems: "center",
  },
  profilePicture: {
  	// flex: 1,
  	borderRadius: 20,
  	height: 40,
  	width: 40,
  	marginRight: 5
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
  	flex: 1,
    ...Fonts.style.normal,	
  },
  rating: {
  	flexDirection: 'row',
  	backgroundColor: "#790E8B",
  	height: 30,
  	width: 30,
  	borderRadius: 15,
  },
  ratingText: {
    ...Fonts.style.normal,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    flex: 1
  }

})
