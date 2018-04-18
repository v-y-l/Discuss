import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Post from '../Components/Post';
import Comment from '../Components/Comment';
import AddComment from '../Components/AddComment';
import SettingsButton from '../Components/SettingsButton';
import SettingsModal from '../Components/SettingsModal';
import CurrentUserActions from '../Redux/CurrentUserRedux';
import CommentsActions from '../Redux/CommentsRedux';

// Styles
import styles from './Styles/CommentsScreenStyle';
import navigationStyles from '../Navigation/Styles/NavigationStyles';

class CommentsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const toggleModal = () => {
      if (navigation.state.params) {
        navigation.state.params.toggleModal();
      }
    };
    return {
      title: 'Comments',
      headerStyle: navigationStyles.header,
      headerTitleStyle: navigationStyles.headerTitle,
      headerTintColor: navigationStyles.tintColor,
      headerRight: <SettingsButton onPress={toggleModal} />,
    };
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  ************************************************************ */

  constructor(props) {
    super(props);
    const postIndex = this.props.posts.byId[this.props.posts.postId];
    const post = this.props.posts.list[postIndex];
    const commentsList = this.props.comments.list;

    this.state = {
      post,
      commentsList,
      replyTo: '',
      isModalVisible: false,
      refreshing: false,
    };
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  ************************************************************ */
  handleReply = (replyToUser) => {
    this.setState({ replyTo: replyToUser });
    this.addCommentComponent.textInput.focus();
  }

  renderRow = ({ item }) => (
    <Comment
      author={item.author}
      comment={item.text}
      handleReply={this.handleReply}
    />
  )

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  ************************************************************ */
  // Render a header?
  renderHeader = () => {
    const {
      recipientFullName, feedback, rating, numComments,
    } = this.state.post;
    return (
      <View>
        <Post
          recipient={recipientFullName}
          text={feedback}
          rating={+rating}
          numComments={numComments}
          showNumComments={false}
        />
        <View style={styles.separator} />
      </View>
    );
  }

  // Render a footer?
  renderFooter = () =>
    <View style={styles.separator} />

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> No comments yet. Be the first! </Text>

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

  componentWillMount() {
    this.props.navigation.setParams({ toggleModal: this._toggleModal });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      commentsList: nextProps.comments.list,
    });
  }

  componentDidUpdate() {
    // fix: does not react to the 'reply' button after the first time
    if (this.state.replyTo.length > 0) {
      this.addCommentComponent.setState({ text: `@${this.state.replyTo} ` });
    }
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _onEndReachedHandler = () => {
    this.props.getMoreComments(this.state.post.id);
  }

  _onRefreshHandler = () => {
    this.props.resetComments();
    this.props.getMoreComments(this.state.post.id);
  }

  render() {
    const currentUser = this.props.currentUser;
    const posts = this.props.posts;
    const pseudonym = (currentUser && posts) ? currentUser.pseudonymList[posts.postId] : null;
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.commentsList}
          renderItem={this.renderRow}
          onEndReached={this._onEndReachedHandler}
          onRefresh={this._onRefreshHandler}
          refreshing={this.state.refreshing}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <SettingsModal
          isVisible={this.state.isModalVisible}
          toggleModal={this._toggleModal}
          pseudonym={pseudonym}
          save={this.props.save}
        />
        <AddComment
          addCommentRef={(addCommentComponent) => { this.addCommentComponent = addCommentComponent; }}
          clearReplyTo={() => { this.setState({ replyTo: '' }); }}
        />
      </View>
    );
    // Get child component via refs: https://github.com/reactjs/react-redux/pull/270#issuecomment-175217424
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  comments: state.comments,
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  getMoreComments: postId =>
    dispatch(CommentsActions.getCommentsRequest(postId)),
  resetComments: () =>
    dispatch(CommentsActions.resetComments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
