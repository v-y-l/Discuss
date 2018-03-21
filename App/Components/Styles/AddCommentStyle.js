import { StyleSheet } from 'react-native'
import Colors from "../../Themes/Colors"

export default StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
  	borderColor: Colors.separator,
  	borderRadius: 50,
  	borderWidth: 1,    
  	marginLeft: 5,
    marginRight: 5,
    paddingLeft: 10
  },
  input: {
  	flex: 3,
  	height: 40, 
  },
  button: {
  	flex: 1,
  	backgroundColor: 'rgba(0,0,0,0)'
  }

})
