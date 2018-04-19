import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Post from '../Components/Post';
import Comment from '../Components/Comment';
import AddComment from '../Components/AddComment';
import SettingsButton from '../Components/SettingsButton';
import SettingsModal from '../Components/SettingsModal';
import CommentsActions from '../Redux/CommentsRedux';

// Styles
import styles from './Styles/CommentsScreenStyle';
import navigationStyles from '../Navigation/Styles/NavigationStyles';

const navigationOptions = ({ navigation }) => {
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
};

class CommentsScreen extends Component {
  static navigationOptions = navigationOptions;

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

  keyExtractor = (item, index) => index

  componentWillMount() {
    this.props.navigation.setParams({ toggleModal: this._toggleModal });
  }

  componentDidMount() {
    this.props.getMoreComments(this.state.post.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      commentsList: nextProps.comments.list,
    });
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
