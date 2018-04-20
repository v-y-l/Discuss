import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(189,0,255)',
  },
  header: {
    fontSize: 75,
    color: 'white',
  },
  loginBox: {
    margin: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginItem: {
    marginBottom: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#E0E0E0',
  }
});

