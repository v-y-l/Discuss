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

import { call, put, select } from 'redux-saga/effects'
import CommentsActions, { CommentsSelectors } from '../Redux/CommentsRedux'
import CurrentUserActions, { CurrentUserSelectors } from '../Redux/CurrentUserRedux'
import { ConvertFromAddComment } from '../Transforms/ConvertFromDiscuss'
import PostsActions from '../Redux/PostsRedux'

export function * getComments (api, action) {
  // get current data from Store
  // const currentData = yield select(CommentsSelectors.getData)
  // make the call to the api

  const { postId } = action
  const offset = yield select(CommentsSelectors.getOffset)
  const limit = yield select(CommentsSelectors.getLimit)
  const response = yield call(api.getComments, postId, offset, limit)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CommentsActions.getCommentsSuccess(response.data))
    yield put(PostsActions.setPostNumComments(postId, response.data.totalComments))
  } else {
    yield put(CommentsActions.getCommentsFailure())
  }
}

export function * postComment (api, action) {

  const {postId, commentText} = action

  const commentAuthor = yield select(CurrentUserSelectors.getPseudonym)
  const token = yield select(CurrentUserSelectors.getToken)
  //This posts the comment to our database
  let postCommentResponse = yield call(api.postComment, postId, commentAuthor, commentText, token)

  if (postCommentResponse.ErrorCode == 0) {
    postCommentResponse = ConvertFromAddComment(postCommentResponse);
  } 

  // success?
  if (postCommentResponse.ok) {
    //We actually do not need to do much from the App side,
    //since the server handles the comment post,
    //we can just make a fresh getPosts call to the server
    //if we wanted the new list of comments
    yield put(CommentsActions.postCommentSuccess())
  } else {
    yield put(CommentsActions.postCommentFailure())
  }
}
