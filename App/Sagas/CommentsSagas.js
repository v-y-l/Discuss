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
import CommentsActions from '../Redux/CommentsRedux'
import PostsActions from '../Redux/PostsRedux'
// import { CommentsSelectors } from '../Redux/CommentsRedux'

export function * getComments (api, action) {
  // get current data from Store
  // const currentData = yield select(CommentsSelectors.getData)
  // make the call to the api

  // fix: this method gets all comments - migrate to getting comments based on postId to scale
  const response = yield call(api.getComments)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CommentsActions.getCommentsSuccess(response.data))
  } else {
    yield put(CommentsActions.getCommentsFailure())
  }
}

export function * postComment (api, action) {
  // get current data from Store
  // const currentData = yield select(CommentsSelectors.getData)
  // make the call to the api

  const {commentAuthor, commentText, postId} = action
  const postCommentResponse = yield call(api.postComment, commentAuthor, commentText)

  // success?
  if (postCommentResponse.ok) {
    // You might need to change the postCommentResponse here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.

    yield put(CommentsActions.postCommentSuccess(postCommentResponse.data))
    yield put(PostsActions.postCommentToPostRequest(postCommentResponse.data.newCommentId, postId))
  } else {
    yield put(CommentsActions.postCommentFailure())
  }
}
