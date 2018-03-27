import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Post from '../Components/Post'
import Comment from '../Components/Comment'
import AddComment from '../Components/AddComment'
import SettingsButton from '../Components/SettingsButton'
import SettingsModal from '../Components/SettingsModal'
import CurrentUserActions from '../Redux/CurrentUserRedux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/CommentsStyle'
import navigationStyles from '../Navigation/Styles/NavigationStyles'

class Comments extends Component {

  static navigationOptions = ({navigation}) => {
    const toggleModal = () => {
      if (navigation.state.params) {
        navigation.state.params.toggleModal()
      }
    }
    return {
      title: 'Comments',
      headerStyle: navigationStyles.header,
      headerTitleStyle: navigationStyles.headerTitle,
      headerTintColor: navigationStyles.tintColor,
      headerRight: <SettingsButton onPress={toggleModal} />
    }
  }

  // If you needed to access variables inside of navigation options:
  // https://github.com/react-navigation/react-navigation/issues/147
  // https://github.com/react-navigation/react-navigation/issues/1789

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/

  constructor(props) {
    super(props) 

    dataObjects = []
    for (let commentId of this.props.post.comments) {
      dataObjects.push(this.props.comments[commentId])
    }
    this.state = {
      dataObjects: dataObjects,
      replyTo: "",
      isModalVisible: false,
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
  handleReply = (replyToUser) => {
    this.setState({replyTo: replyToUser})
  }

  renderRow = ({item}) => {
    return ( 
      <Comment 
        author={item.author} 
        comment={item.text} 
        handleReply={this.handleReply} 
      />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <View>
      <Post 
        recipient={this.props.post.recipient} 
        text={this.props.post.text}
        rating={+this.props.post.rating} 
        numComments={this.props.post.comments.length}
        showNumComments={false}
      />
      <View style={styles.separator}></View>
    </View>

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

  componentWillMount() {
    this.props.navigation.setParams({toggleModal: this._toggleModal})    
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post && nextProps.comments) {
      dataObjects = []
      for (let commentId of nextProps.post.comments) {
        dataObjects.push(nextProps.comments[commentId])
      }
      this.setState({dataObjects:dataObjects})
    }
  }

  componentDidUpdate() {
    //fix: does not react to the 'reply' button after the first time
    if (this.state.replyTo.length > 0) {
      this.addCommentComponent.setState({text:`@${this.state.replyTo} `})
      this.addCommentComponent.textInput.focus()
    }

  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  //Fix: currently, this only checks for total number of comments
  //Would make more sense to check if the commentIds are the same
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.dataObjects.length !== nextState.dataObjects.length 
  //     || Object.keys(this.props.comments).length !== Object.keys(nextProps.comments).length
  //     || this.state.replyTo !== nextState.replyTo
  //     || this.state.isModalVisible != nextState.isModalVisible
  // }

  render() {

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <SettingsModal 
          isVisible={this.state.isModalVisible} 
          toggleModal={this._toggleModal} 
          pseudonym={this.props.pseudonym}
          save={this.props.save}
        />
        <AddComment 
          addCommentRef={(addCommentComponent) => {this.addCommentComponent = addCommentComponent}}
          clearReplyTo={()=> {this.setState({replyTo:""})}}
        />

      </View>
    )
    //Get child component via refs: https://github.com/reactjs/react-redux/pull/270#issuecomment-175217424
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.posts[state.posts.postId],
    comments: state.comments.comments,
    pseudonym: state.currentUser.pseudonym,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    save: (pseudonym) => dispatch(CurrentUserActions.setPseudonymRequest(pseudonym))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
