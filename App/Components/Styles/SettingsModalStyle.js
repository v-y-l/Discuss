import { StyleSheet } from 'react-native'
import { Fonts } from '../../Themes/'
import { Colors } from '../../Themes/'
import { ApplicationStyles } from '../../Themes/'
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
  	backgroundColor: '#ffffff',
  	borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  modalInputs: {
  	paddingTop: 15,
  	paddingLeft: 15,
  	paddingRight: 15,
  	paddingBottom: 10,
  },
  header: {
  	...Fonts.style.h5,
  	textAlign: 'center',
  	marginBottom: 10
  },
  modalButtons: {
  	paddingBottom: 10,
  	paddingLeft: 5,
  	paddingRight: 5,
  	flexDirection: 'row',
  	justifyContent: 'space-around'
  },
  input: {
  	...Fonts.style.normal,
  	textAlign: 'center',
  	padding: 8,
  	borderRadius: 5,
  	borderColor: '#C0C0C0',
  	borderWidth: 1
  },
  separator: {
  	borderBottomWidth: 1,
  	borderColor: '#C0C0C0',
  }
})
