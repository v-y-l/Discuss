import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
  	borderColor: Colors.separator,
  	borderRadius: 50,
  	borderWidth: 1,
  	marginLeft: 5,
    marginRight: 5,
    paddingLeft: 10,
    marginTop: 5,
  },
  input: {
  	flex: 3,
  	height: 40,
    opacity: 0.5,
  },
  button: {
  	backgroundColor: 'rgba(0,0,0,0)',
    paddingRight: 15,
    paddingTop: 10,
  },
  buttonText: {
    color: '#007AFF',
  },
  disabledButtonText: {
    color: 'rgb(90,200,250)',
  },

});
