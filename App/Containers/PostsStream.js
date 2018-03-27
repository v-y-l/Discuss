import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import TouchablePost from '../Components/TouchablePost'
import PostsActions from '../Redux/PostsRedux'
import CurrentUserActions from '../Redux/CurrentUserRedux'

import { connect } from 'react-redux'
import SettingsButton from '../Components/SettingsButton'
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
      headerRight: <SettingsButton onPress={toggleModal} />
    }
  }

  // If you needed to access variables inside of navigation options:
  // https://github.com/react-navigation/react-navigation/issues/147
  // https://github.com/react-navigation/react-navigation/issues/1789
  
  componentDidMount() {
    this.props.navigation.setParams({toggleModal: this._toggleModal})
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/

  constructor(props) {
    super(props) 
    this.state = {
      posts: [],
      isModalVisible: false
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

  // https://github.com/react-native-community/react-native-modal
  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  //Caught in infinity - https://github.com/erikras/redux-form/issues/2629
  componentDidUpdate() {
    let posts = Object.values(this.props.posts || {})
    this.setState({posts})
  }

  //Fix: This level of complexity probably isn't the best way to do things
  // but I don't have a better fix currently
    // console.log("\n\nnew shouldComponentUpdate")
    // console.log("props")
    // console.log(this.props)
    // console.log(nextProps)
    // console.log(this.props!=nextProps)
    // console.log("state")
    // console.log(this.state)    
    // console.log(nextState)
    // console.log(this.state!=nextState)
  shouldComponentUpdate(nextProps, nextState) {
    var curNumComments = 0
    var nextNumComments = 0
    for (var post of this.state.posts) {
      curNumComments += post.comments.length
    }     
    for (var post of nextState.posts) {
      nextNumComments += post.comments.length
    } 
    return this.props.posts == null && nextProps.posts != null 
    || this.state.isModalVisible != nextState.isModalVisible 
    || curNumComments != nextNumComments 
    || this.props != nextProps
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
          // ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <SettingsModal 
          isVisible={this.state.isModalVisible} 
          toggleModal={this._toggleModal} 
          pseudonym={this.props.pseudonym}
          save={this.props.save}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
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
