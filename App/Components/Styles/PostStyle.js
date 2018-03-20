import { StyleSheet } from 'react-native'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15
  },
  //header
  header: {
  	flex: 1,
  	flexDirection: "row",
  },
  profilePicture: {
  	// flex: 1,
  	borderRadius: 25,
  	height: 50,
  	width: 50
  },
  headerText: {
    ...Fonts.style.normal,

  	// flex: 3
  },
  icon: {
  	color: "#000000",
  },
  //comment
  comment: {
  	flex: 1,
  	flexDirection: "row"
  },
  commentText: {
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
