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
************************************************************ */

import { call, put, select } from 'redux-saga/effects';
import PostsActions, { PostsSelectors } from '../Redux/PostsRedux';
import { CurrentUserSelectors } from '../Redux/CurrentUserRedux';
import { ConvertFromGetStream } from '../Transforms/ConvertFromDiscuss';
import CommentsActions from '../Redux/CommentsRedux';
import { NavigationActions } from 'react-navigation';

export function* getPosts(api, action) {
  // get current data from Store
  // const currentData = yield select(PostsSelectors.getData)
  // make the call to the api

  const offset = yield select(PostsSelectors.getOffset);
  const limit = yield select(PostsSelectors.getLimit);
  const token = yield select(CurrentUserSelectors.getToken);
  let response = yield call(api.getPosts, offset, limit, token);

  if (response.ErrorCode == 0) {
    response = ConvertFromGetStream(response, offset);
  }

  // success?
  if (response.ok) {
    yield put(PostsActions.getPostsSuccess(response.data));
  } else {
    yield put(PostsActions.getPostsFailure());
  }
}

export function* selectPost(action) {
  const { postId } = action;
  yield put(PostsActions.selectPostSuccess(postId));
  yield put(CommentsActions.resetComments());
  yield put(CommentsActions.getCommentsRequest(postId));
  yield put(NavigationActions.navigate({ routeName: 'Comments' }));
}
