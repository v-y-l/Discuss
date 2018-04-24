import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { connect } from 'react-redux';
import Post from '../Components/Post';
import Comment from '../Components/Comment';
import AddComment from '../Components/AddComment';
import SettingsButton from '../Components/SettingsButton';
import SettingsModal from '../Components/SettingsModal';
import CommentsActions from '../Redux/CommentsRedux';
import CurrentUserActions from '../Redux/CurrentUserRedux';
import PostsActions from '../Redux/PostsRedux';

// Styles
import styles from './Styles/CommentsScreenStyle';
import navigationStyles from '../Navigation/Styles/NavigationStyles';


class ScrollUpTitle extends Component {
  render() {
    return (
      <TouchableOpacity onPress={()=>console.log('hi')}>
        <Text style={navigationStyles.headerTitle}>Comments</Text>
      </TouchableOpacity>
    );
  }
};

const navigationOptions = ({ navigation }) => {
  const toggleModal = () => {
    if (navigation.state.params) {
      navigation.state.params.toggleModal();
    }
  };
  return {
    headerTitle: <ScrollUpTitle />,
    headerStyle: navigationStyles.header,
    headerRight: <SettingsButton onPress={toggleModal} />,
    headerLeft: <HeaderBackButton
      title="Feedback"
      onPress={() => {
      if (navigation.state.params) {
        navigation.state.params.resetPosts();
        navigation.state.params.getMorePosts();
        navigation.goBack();
      }
    }}
    />,
  };
};

/**
 * This component displays the given comments for
 * a particular feedback post.
 */

class CommentsScreen extends Component {
  static navigationOptions = navigationOptions;

  static getDerivedStateFromProps(nextProps, prevState) {
    const commentsList = nextProps.comments.list;
    const { currentUser } = nextProps;
    const {
      post,
      replyTo,
      isModalVisible,
      refreshing,
    } = prevState;

    const pseudonym = currentUser.pseudonymList[post.id];

    return {
      post,
      commentsList,
      pseudonym,
      replyTo,
      isModalVisible,
      refreshing,
    };
  }

  constructor(props) {
    super(props);
    const postIndex = this.props.posts.byId[this.props.posts.postId];
    const post = this.props.posts.list[postIndex];
    this.state = {
      post,
      pseudonym: '',
      commentsList: [],
      replyTo: '',
      isModalVisible: false,
      refreshing: false,
    };
  }

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

  renderFooter = () =>
    <View style={styles.separator} />

  renderEmpty = () =>
    <Text style={styles.label}> No comments yet. Be the first! </Text>

  renderSeparator = () =>
    <View style={styles.separator} />

  keyExtractor = (item, index) => index.toString()

  componentDidMount() {
    const navigationParams = {
      toggleModal: this._toggleModal,
      resetPosts: this.props.resetPosts,
      getMorePosts: this.props.getMorePosts,
    };
    this.props.navigation.setParams(navigationParams);
    this.props.getPseudonym(this.state.post.id);
    this.props.resetComments();
    this.props.getMoreComments(this.state.post.id);
  }

  componentDidUpdate() {
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
          pseudonym={this.state.pseudonym}
        />
        <AddComment
          addCommentRef={(addCommentComponent) => {
            this.addCommentComponent = addCommentComponent;
          }}
          clearReplyTo={() => { this.setState({ replyTo: '' }); }}
        />
      </View>
    );
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
  getMorePosts: () =>
    dispatch(PostsActions.getPostsRequest()),
  resetPosts: () =>
    dispatch(PostsActions.resetPosts()),
  getPseudonym: postId => 
    dispatch(CurrentUserActions.getPseudonymRequest(postId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
