import { takeLatest, all } from 'redux-saga/effects';
import Discuss from '../Services/Discuss';
import FixtureAPI from '../Services/FixtureApi';
import AppConfig from '../Config/AppConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { PostsTypes } from '../Redux/PostsRedux';
import { CommentsTypes } from '../Redux/CommentsRedux';
import { CurrentUserTypes } from '../Redux/CurrentUserRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { getPosts, selectPost } from './PostsSagas';
import { getComments, postComment } from './CommentsSagas';
import { getPseudonym, getUsers, toggleFollowUser, doLogin } from './CurrentUserSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const { baseUrl, useFixture } = AppConfig;
const api = Discuss.create(baseUrl);
const fixture = FixtureAPI;
const service = useFixture ? fixture : api;

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(PostsTypes.SELECT_POST_REQUEST, selectPost),

    // some sagas receive extra parameters in addition to an action
    takeLatest(CurrentUserTypes.DO_LOGIN_REQUEST, doLogin, service),
    takeLatest(CurrentUserTypes.GET_PSEUDONYM_REQUEST, getPseudonym, service),
    takeLatest(PostsTypes.GET_POSTS_REQUEST, getPosts, service),
    takeLatest(CommentsTypes.GET_COMMENTS_REQUEST, getComments, service),
    takeLatest(CommentsTypes.POST_COMMENT_REQUEST, postComment, service),
    takeLatest(CurrentUserTypes.GET_USERS_REQUEST, getUsers, service),
    takeLatest(CurrentUserTypes.TOGGLE_FOLLOW_USER_REQUEST, toggleFollowUser, service),
  ]);
}
