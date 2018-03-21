import { StyleSheet } from 'react-native'
import Colors from "../../Themes/Colors"

export default StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
  	borderColor: Colors.separator,
  	borderRadius: 50,
  	borderWidth: 1,
  },
  input: {
  	flex: 3,
  	height: 40, 
  },
  button: {
  	flex: 1
  }

})
