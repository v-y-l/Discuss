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
import CurrentUserActions, { CurrentUserSelectors } from '../Redux/CurrentUserRedux';
import PostsActions from '../Redux/PostsRedux';
import { NavigationActions } from 'react-navigation';
import { ConvertFromUserFollowList, ConvertFromToggleFollow, ConvertFromGetPseudonym, ConvertFromDoLogin } from '../Transforms/ConvertFromDiscuss';
import { alert } from '../Containers/LoginScreen';

export function* doLogin(api, action) {
  const { email, password } = action;
  let response = yield call(api.doLogin, email, password);

  if (response.ErrorCode == 0) {
    response = ConvertFromDoLogin(response);
  }

  // success?
  if (response.ok) {
    yield put(CurrentUserActions.doLoginSuccess(response.token));
    yield put(NavigationActions.navigate({routeName: 'AppScreen'}));
  } else {
    yield put(CurrentUserActions.doLoginFailure());
    yield call(alert);
  }
}

export function* getPseudonym(api, action) {
  const { postId } = action;
  const pseudonym = yield select(CurrentUserSelectors.getPseudonym);
  if (!is(String, pseudonym)) {
    const token = yield select(CurrentUserSelectors.getToken);

    let response = yield call(api.getPseudonym, postId, token);

    if (response.ErrorCode == 0) {
      response = ConvertFromGetPseudonym(response);
    }
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(CurrentUserActions.getPseudonymSuccess(postId, response.pseudonym));
    } else {
      yield put(CurrentUserActions.getPseudonymFailure());
    }
  }
}

export function* getUsers(api, action) {
  const offset = yield select(CurrentUserSelectors.getOffset);
  const limit = yield select(CurrentUserSelectors.getLimit);
  const searchText = yield select(CurrentUserSelectors.getSearchText);
  const token = yield select(CurrentUserSelectors.getToken);
  let response = yield call(api.getUsers, offset, limit, searchText, token);

  // this isn't elegant at all, I'm hacking my response to look like my fixture
  // to-do: redesign fixture to look like API, then convert the whole app
  if (response.ErrorCode == 0) {
    response = ConvertFromUserFollowList(response, offset);
  }

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CurrentUserActions.getUsersSuccess(response.data));
  } else {
    yield put(CurrentUserActions.getUsersFailure());
  }
}

export function* toggleFollowUser(api, action) {
  // get current data from Store
  // const currentData = yield select(CurrentUserSelectors.getData)
  // make the call to the api

  // fix: replace with actual data
  const { toggleUserId } = action;
  const token = yield select(CurrentUserSelectors.getToken);
  let response = yield call(api.toggleFollowUser, toggleUserId, token);

  if (response.ErrorCode == 0) {
    response = ConvertFromToggleFollow(response);
  }

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PostsActions.resetPosts());
    yield put(PostsActions.getPostsRequest());
    yield put(CurrentUserActions.toggleFollowUserSuccess(toggleUserId));
  } else {
    yield put(CurrentUserActions.toggleFollowUserFailure());
  }
}
