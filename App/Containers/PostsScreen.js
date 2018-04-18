import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import TouchablePost from '../Components/TouchablePost';
import PostsActions, { PostsSelectors } from '../Redux/PostsRedux';
import CurrentUserActions from '../Redux/CurrentUserRedux';

import { connect } from 'react-redux';
import MenuButton from '../Components/MenuButton';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/PostsScreenStyle';

class PostsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Feedback',
    headerLeft: <MenuButton onPress={() => { navigation.navigate('DrawerOpen'); }} />,
  })

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  ************************************************************ */

  constructor(props) {
    super(props);
    const postsList = (this.props.posts && this.props.posts.list) || [];
    this.state = {
      postsList,
      isModalVisible: false,
      pseudonym: this.props.pseudonym,
      refreshing: false,
    };
  }

  onPressItem = this.props.selectPost

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  ************************************************************ */
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

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  ************************************************************ */

  // Render a footer?
  renderFooter = () =>
    <View style={styles.separator} />

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> No posts to see. Go follow someone! </Text>

  renderSeparator = () =>
    <View style={styles.separator} />

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

  componentWillReceiveProps(nextProps) {
    const postsList = nextProps.posts.list;
    this.setState({
      postsList,
      pseudonym: nextProps.pseudonym,
    });
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
          // onEndReachedThreshold - adjust this if you want the
          // loading of items to be less sensitive, but I think
          // this is okay for now as it doesn't take away from UX
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
  pseudonym: state.currentUser.pseudonym,
});

const mapDispatchToProps = dispatch => ({
  selectPost: (postId) => {
    dispatch(PostsActions.selectPostRequest(postId));
    dispatch(CurrentUserActions.getPseudonymRequest(postId));
  },
  getMorePosts: () => dispatch(PostsActions.getPostsRequest()),
  resetPosts: () => dispatch(PostsActions.resetPosts()),
  save: pseudonym => dispatch(CurrentUserActions.setPseudonymRequest(pseudonym)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);
