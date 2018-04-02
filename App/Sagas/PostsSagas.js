/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import PostsActions from '../Redux/PostsRedux'
import {NavigationActions} from 'react-navigation'
// import { PostsSelectors } from '../Redux/PostsRedux'

export function * getPosts (api, action) {

  // get current data from Store
  // const currentData = yield select(PostsSelectors.getData)
  // make the call to the api
  const response = yield call(api.getPosts)

  // success?
  if (response.ok) {
    yield put(PostsActions.getPostsSuccess(response.data))
  } else {
    yield put(PostsActions.getPostsFailure())
  }
}

export function * selectPost (action) {
  const { postId } = action
  yield put(PostsActions.selectPostSuccess(postId))
  yield put(NavigationActions.navigate({'routeName':'Comments'}))
}

export function * postCommentToPost (api, action) {

  // get current data from Store
  // const currentData = yield select(PostsSelectors.getData)
  // make the call to the api

  const { commentId, postId } = action

  const response = yield call(api.postCommentToPost, commentId, postId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PostsActions.postCommentToPostSuccess(response.data))
  } else {
    yield put(PostsActions.postCommentToPostFailure())
  }
}
