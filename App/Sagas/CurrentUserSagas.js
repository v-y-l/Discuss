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
import CurrentUserActions, { CurrentUserSelectors } from '../Redux/CurrentUserRedux'
import PostsActions from '../Redux/PostsRedux'
import { is } from 'ramda'

export function * getPseudonym (api, action) {
  const { postId } = action
  //fix: this
  let pseudonym = yield select(CurrentUserSelectors.getPseudonym)
  if (!is(String, pseudonym)) {
    const response = yield call(api.getPseudonym, postId)
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(CurrentUserActions.getPseudonymSuccess(postId, response.pseudonym))
    } else {
      yield put(CurrentUserActions.getPseudonymFailure())
    }
  }
}

export function * getUsers (api, action) {
  // get current data from Store
  // const currentData = yield select(CurrentUserSelectors.getData)
  // make the call to the api
  const offset = yield select(CurrentUserSelectors.getOffset)
  const limit = yield select(CurrentUserSelectors.getLimit)
  const searchText = yield select(CurrentUserSelectors.getSearchText)
  const response = yield call(api.getUsers, offset, limit, searchText)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CurrentUserActions.getUsersSuccess(response.data))
  } else {
    yield put(CurrentUserActions.getUsersFailure())
  }
}

export function * toggleFollowUser (api, action) {
  // get current data from Store
  // const currentData = yield select(CurrentUserSelectors.getData)
  // make the call to the api

  //fix: replace with actual data
  const { toggleUserId } = action
  const response = yield call(api.toggleFollowUser, toggleUserId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PostsActions.resetPosts())
    yield put(PostsActions.getPostsRequest())
    yield put(CurrentUserActions.toggleFollowUserSuccess(toggleUserId))
  } else {
    yield put(CurrentUserActions.toggleFollowUserFailure())
  }
}
