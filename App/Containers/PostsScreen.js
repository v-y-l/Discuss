import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import TouchablePost from '../Components/TouchablePost';
import PostsActions from '../Redux/PostsRedux';
import CurrentUserActions from '../Redux/CurrentUserRedux';
import MenuButton from '../Components/MenuButton';

// Styles
import styles from './Styles/PostsScreenStyle';

const navigationOptions = ({ navigation }) => ({
  title: 'Feedback',
  headerLeft: <MenuButton onPress={() => { navigation.navigate('DrawerOpen'); }} />,
});

class PostsScreen extends Component {
  static navigationOptions = navigationOptions;

  constructor(props) {
    super(props);
    const postsList = (this.props.posts && this.props.posts.list) || [];
    this.state = {
      postsList,
      isModalVisible: false,
      refreshing: false,
    };
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _onEndReachedHandler = () => {
    this.props.getMorePosts();
  }

  _onRefreshHandler = () => {
    this.props.resetPosts();
    this.props.getMorePosts();
  }

  renderRow = ({ item }) => (
    <TouchablePost
      recipient={item.recipientFullName}
      text={item.feedback}
      rating={+item.rating}
      numComments={item.numComments}
      postId={+item.id}
      onPressItem={this.props.selectPost}
    />
  )

  renderFooter = () =>
    <View style={styles.separator} />

  renderEmpty = () =>
    <Text style={styles.label}> No posts to see. Go follow someone! </Text>

  renderSeparator = () =>
    <View style={styles.separator} />

  keyExtractor = (item, index) => index.toString()

  static getDerivedStateFromProps(nextProps, prevState) {
    const postsList = nextProps.posts.list;
    return {
      postsList,
      isModalVisible: false,
      refreshing: false,
    };
  }

  render() {
    this.onPressItem = this.props.selectPost;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.postsList}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this._onEndReachedHandler}
          onRefresh={this._onRefreshHandler}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  selectPost: (postId) => {
    dispatch(PostsActions.selectPostRequest(postId));
    dispatch(CurrentUserActions.getPseudonymRequest(postId));
  },
  getMorePosts: () => dispatch(PostsActions.getPostsRequest()),
  resetPosts: () => dispatch(PostsActions.resetPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);
