import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: '#000000'
  },
  listContent: {
    // marginTop: Metrics.baseMargin
  },
  searchContainer: {
    backgroundColor: "#ffffff",
    borderTopColor: 'transparent',
    borderBottomColor: Colors.separator,
    borderBottomWidth: 3,
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 15,
    paddingLeft: 5,
    paddingRight: 5
  },
  searchInput: {
    backgroundColor: Colors.separator,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
