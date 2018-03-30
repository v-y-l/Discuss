import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import TouchablePost from '../Components/TouchablePost'
import PostsActions, { PostsSelectors } from '../Redux/PostsRedux'
import CurrentUserActions from '../Redux/CurrentUserRedux'

import { connect } from 'react-redux'
import SettingsButton from '../Components/SettingsButton'
import MenuButton from '../Components/MenuButton'
import SettingsModal from '../Components/SettingsModal'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/PostsStreamStyle'

class PostsStream extends Component {

  static navigationOptions = ({navigation}) => {

    const toggleModal = () => {
      navigation.state.params.toggleModal()
    }
    return {
      title: 'Feedback',
      headerRight: <SettingsButton onPress={toggleModal} />,
      headerLeft: <MenuButton onPress={()=>{navigation.navigate("DrawerOpen")}} />
    }
  }

  // If you needed to access variables inside of navigation options:
  // https://github.com/react-navigation/react-navigation/issues/147
  // https://github.com/react-navigation/react-navigation/issues/1789
  
  componentWillMount() {
    this.props.navigation.setParams({toggleModal: this._toggleModal})
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/

  constructor(props) {
    super(props) 
    let posts = Object.values(this.props.posts || {})
    let userList = (this.props.user && this.props.user.results) || []
    posts = filterPosts(posts, userList)
    this.state = {
      posts: posts,
      isModalVisible: false,
      pseudonym: this.props.pseudonym
    }
  }


  onPressItem = this.props.selectPost


  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({item}) => {
    return (
      <TouchablePost 
        recipient={item.recipient} 
        text={item.text}
        rating={+item.rating} 
        numComments={item.comments.length} 
        postId={item.id}
        onPressItem={this.props.selectPost}
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
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <View style={styles.separator}></View>


  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> No posts to see. Go follow someone! </Text>

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

  // https://github.com/react-native-community/react-native-modal
  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  //https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d
  componentWillReceiveProps(nextProps) {
    let posts = Object.values(nextProps.posts || {})
    let userList = (nextProps.users && nextProps.users.results) || []
    posts = filterPosts(posts, userList)

    //https://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately
    this.setState({
      posts: posts, 
      pseudonym: nextProps.pseudonym
    })
  }

  render () {

    this.onPressItem = this.props.selectPost

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.posts}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          // ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <SettingsModal 
          isVisible={this.state.isModalVisible} 
          toggleModal={this._toggleModal} 
          pseudonym={this.state.pseudonym}
          save={this.props.save}
        />
      </View>
    )
  }
}

const filterPosts = (posts, usersFollowing) => {
  if (posts.length === 0) {
    return []
  }
  if (Object.keys(usersFollowing).length === 0) {
    return posts
  }
  return posts.filter(post => userList[post.recipient].following)
}


const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    users: state.users,
    pseudonym: state.currentUser.pseudonym,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectPost: (postId) => dispatch(PostsActions.selectPostRequest(postId)),
    save: (pseudonym) => dispatch(CurrentUserActions.setPseudonymRequest(pseudonym))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsStream)
