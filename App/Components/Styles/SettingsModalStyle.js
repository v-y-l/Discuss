import { StyleSheet } from 'react-native'
import { Fonts } from '../../Themes/'
import { ApplicationStyles } from '../../Themes/'
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
  	backgroundColor: '#ffffff',
  	borderRadius: 5
  },
  modalHeader: {
  	padding: 15,
  },
  header: {
  	...Fonts.style.h5,
  	textAlign: 'center',
  	marginBottom: 10
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
