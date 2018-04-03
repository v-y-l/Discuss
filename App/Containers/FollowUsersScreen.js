import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import UserRow  from '../Components/UserRow'
import MenuButton from '../Components/MenuButton'
import CurrentUserActions from '../Redux/CurrentUserRedux'
import { SearchBar } from 'react-native-elements'

// Styles
import styles from './Styles/FollowUsersScreenStyle'

class Users extends React.PureComponent {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Follow Users',
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
    let userList = this.props.currentUser.users
    this.state = {
      userList,
      searchBarText: "",
      refreshing: false
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
      <UserRow 
        toggleUserId={item.id} //the userId we are toggling following/unfollowing
        fullName={item.fullName}
        following={item.following} 
        toggleFollowUser={this.props.toggleFollowUser} 
      />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  // https://react-native-training.github.io/react-native-elements/docs/0.19.0/searchbar.html
  _onChangeText = (searchBarText) => {
    this.setState({searchBarText})
    this.props.setSearchText(searchBarText)
    this._onRefreshHandler()
  }

  renderHeader = () =>
    <View>
      <SearchBar
        onChangeText={this._onChangeText}
        // onClearText={someMethod}
        noIcon
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
        autoCorrect={false}
        placeholder='Search users by name...' />
    </View>
  // Render a footer?
  renderFooter = () =>
    <View style={styles.separator}></View>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> No results. Adjust your search text! </Text>

  renderSeparator = () =>
    <View style={styles.separator}></View>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

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
    let userList = nextProps.currentUser.users
    this.setState({userList})
  }

  _onEndReachedHandler = () => {
    this.props.getMoreUsers()
  }

  _onRefreshHandler = () => {
    this.props.resetUsers()
    this.props.getMoreUsers()
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.userList}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          onEndReached={this._onEndReachedHandler}
          onRefresh={this._onRefreshHandler}
          refreshing={this.state.refreshing}
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
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFollowUser: (toggleUserId) => {
      dispatch(CurrentUserActions.toggleFollowUserRequest(toggleUserId))
    },
    getMoreUsers: ()=> {
      dispatch(CurrentUserActions.getUsersRequest())
    },
    resetUsers: ()=> {
      dispatch(CurrentUserActions.resetUsers())
    },
    setSearchText: (searchText)=> {
      dispatch(CurrentUserActions.setSearchText(searchText))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
