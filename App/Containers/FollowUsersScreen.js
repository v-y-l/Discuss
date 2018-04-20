/* ***********************************************************
  * This screen presents a list of users you can follow (or not!)
  * Your preferences filter posts on PostsScreen
  ************************************************************ */

import React from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import UserRow from '../Components/UserRow';
import MenuButton from '../Components/MenuButton';
import CurrentUserActions from '../Redux/CurrentUserRedux';

// Styles
import styles from './Styles/FollowUsersScreenStyle';

const navigationOptions = ({ navigation }) => ({
  title: 'Follow Users',
  headerLeft: <MenuButton onPress={() => { navigation.navigate('DrawerOpen'); }} />,
});

class Users extends React.PureComponent {
  static navigationOptions = navigationOptions;

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      userList: nextProps.currentUser.users,
      refreshing: prevState.refreshing,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      refreshing: false,
    };
  }

  componentDidUpdate() {
    this.props.setSearchText('');
  }

  renderRow = ({ item }) => (
    <UserRow
      toggleUserId={item.id} // the userId we are toggling following/unfollowing
      fullName={item.fullName}
      following={item.following}
      toggleFollowUser={this.props.toggleFollowUser}
    />
  )

  renderHeader = () =>
    (<View>
      <SearchBar
        onChangeText={this._onChangeText}
        noIcon
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
        autoCorrect={false}
        placeholder="Search users by name..."
      />
     </View>)

  renderFooter = () =>
    <View style={styles.separator} />

  renderEmpty = () =>
    <Text style={styles.label}> No results. Adjust your search text! </Text>

  renderSeparator = () =>
    <View style={styles.separator} />

  keyExtractor = (item, index) => index.toString();

  _onChangeText = (searchBarText) => {
    this.props.setSearchText(searchBarText); // passes it to the redux
    this._onRefreshHandler(); // clear the old userList, and then fetch more
  }

  _onEndReachedHandler = () => {
    this.props.getMoreUsers();
  }

  _onRefreshHandler = () => {
    this.props.resetUsers();
    this.props.getMoreUsers();
  }

  render() {
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
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  toggleFollowUser: (toggleUserId) => {
    dispatch(CurrentUserActions.toggleFollowUserRequest(toggleUserId));
  },
  getMoreUsers: () => {
    dispatch(CurrentUserActions.getUsersRequest());
  },
  resetUsers: () => {
    dispatch(CurrentUserActions.resetUsers());
  },
  setSearchText: (searchText) => {
    dispatch(CurrentUserActions.setSearchText(searchText));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
