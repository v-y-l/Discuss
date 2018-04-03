  /* ***********************************************************
  * This screen presents a list of users you can follow (or not!)
  * Your preferences filter posts on PostsScreen
  *************************************************************/

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

  constructor(props) {
    super(props)
    let userList = this.props.currentUser.users
    this.props.setSearchText("")
    this._onRefreshHandler()
    this.state = {
      userList,
      searchBarText: "",
      refreshing: false
    }
  }

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

  /* ***********************************************************
  * We store offset, limit, and searchText in the currentUserRedux.
  * When we can getMoreUsers, the currentUsers redux will receive
  * a userList that complies to the offset, limit, and searchText.
  *
  * If we change the search string, this will start building a new
  * userList based off of the new parameters. If we don't, then we
  * will be concating to a previous userList as we paginate.
  *************************************************************/

  componentWillReceiveProps(nextProps) {
    let userList = nextProps.currentUser.users
    this.setState({userList})
  }

  _onChangeText = (searchBarText) => {
    this.setState({searchBarText}) //sets the state for this component
    this.props.setSearchText(searchBarText) //passes it to the redux
    this._onRefreshHandler() //clear the old userList, and then fetch more
    //based on the new searchText
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
