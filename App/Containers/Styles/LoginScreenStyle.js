import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';
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
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  loginItem: {
    padding: 10,
    margin: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  }
});

