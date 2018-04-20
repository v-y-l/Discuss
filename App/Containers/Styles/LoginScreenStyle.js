import { StyleSheet } from 'react-native';
import { Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(170,76,186)',
  },
  header: {
    fontFamily: Fonts.type.base,
    fontSize: 75,
    color: 'white',
  },
  loginBox: {
    margin: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  loginItem: {
    padding: 10,
    margin: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  loginButton: {
    backgroundColor: 'rgba(26,114,249,0.8)',
    margin: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  loginText: {
    color: 'white',
    padding: 10,
  },
});

