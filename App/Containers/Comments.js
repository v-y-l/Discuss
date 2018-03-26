import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Post from '../Components/Post'
import Comment from '../Components/Comment'
import AddComment from '../Components/AddComment'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/CommentsStyle'
import navigationStyles from '../Navigation/Styles/NavigationStyles'

class Comments extends React.PureComponent {

  static navigationOptions= {
    title: 'Comments',
    headerStyle: navigationStyles.header,
    headerTitleStyle: navigationStyles.headerTitle,
    headerTintColor: navigationStyles.tintColor
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/

  constructor(props) {
    super(props) 
    this.state = {
      dataObjects: [],
      replyTo: ""
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
  componentDidUpdate() {
    //fix: does not react to the 'reply' button after the first time
    if (this.state.replyTo.length > 0) {
      this.addCommentComponent.setState({text:`@${this.state.replyTo} `})
      this.addCommentComponent.textInput.focus()
    }
  }

  render() {
    if (this.props.post && this.props.comments) {
      this.state.dataObjects = []
      for (let commentId of this.props.post.comments) {
        this.state.dataObjects.push(this.props.comments[commentId])
      }
    }
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
    comments: state.comments.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
