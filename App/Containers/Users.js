import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import UserRow  from '../Components/UserRow'
import MenuButton from '../Components/MenuButton'
import CurrentUserActions from '../Redux/CurrentUserRedux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/UsersStyle'

class Users extends React.PureComponent {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Users',
      headerLeft: <MenuButton onPress={()=>{navigation.navigate("DrawerOpen")}} />
    }
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  constructor(props) {
    super(props)
    let usersFollowing = this.props.usersFollowing ? this.props.usersFollowing.usersFollowing : {}
    this.state = {
      usersFollowing: Object.values(usersFollowing)
    }
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({item}) => {
    return (
      <UserRow name={item.name} following={item.following} toggleFollow={this.props.toggleFollow} />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <View style={styles.separator}></View>

  // Render a footer?
  renderFooter = () =>
    <View style={styles.separator}></View>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <View style={styles.separator}></View>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  componentWillReceiveProps(nextProps) {
    let usersFollowing = nextProps.usersFollowing ? nextProps.usersFollowing.usersFollowing : {}
    this.setState({usersFollowing : Object.values(usersFollowing)})
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.usersFollowing}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersFollowing: state.currentUser.usersFollowing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFollow: (userId, toggleUserId) => 
      dispatch(CurrentUserActions.toggleUsersFollowingRequest(userId, toggleUserId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
