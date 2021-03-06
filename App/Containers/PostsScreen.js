import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import TouchablePost from '../Components/TouchablePost';
import PostsActions from '../Redux/PostsRedux';
import CommentsActions from '../Redux/CommentsRedux';
import CurrentUserActions from '../Redux/CurrentUserRedux';
import MenuButton from '../Components/MenuButton';
import ScrollUpTitle from '../Components/ScrollUpTitle';

import styles from './Styles/PostsScreenStyle';

/**
 * This component acts as the landing screen of the app.
 * It streams the feedback of users you follow.
 * If you click on any of the posts, it takes you to another
 * screen which enables you to discuss it.
 */

const navigationOptions = ({ navigation }) => {
  const scrollToTop = () => {
    if (navigation.state.params) {
      navigation.state.params.scrollToTop();
    }
  };
  return {
    headerTitle: <ScrollUpTitle onPress={scrollToTop} title={'Feedback'} />,
    headerLeft: <MenuButton onPress={() => { navigation.navigate('DrawerOpen'); }} />,
  };
};

class PostsScreen extends Component {
  static navigationOptions = navigationOptions;

  static getDerivedStateFromProps(nextProps, prevState) {
    const postsList = nextProps.posts.list;
    return {
      postsList,
      refreshing: prevState.refreshing,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      postsList: [],
      refreshing: false,
    };
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


  componentDidMount() {
    navigationParams = {
      scrollToTop: () => { this.postsFlatList.scrollToOffset(0,true);},
    };
    this.props.navigation.setParams(navigationParams);
    this.props.getMorePosts();
  }

  render() {
    this.onPressItem = this.props.selectPost;

    return (
      <View style={styles.container}>
        <FlatList
          ref={(list)=> {this.postsFlatList = list;}}
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
  },
  getMorePosts: () => {
    dispatch(PostsActions.getPostsRequest())
  },
  resetPosts: () => {
    dispatch(PostsActions.resetPosts())
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);
