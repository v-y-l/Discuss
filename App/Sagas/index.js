import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import Discuss from '../Services/Discuss'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { PostsTypes } from '../Redux/PostsRedux'
import { CommentsTypes } from '../Redux/CommentsRedux'
import { CurrentUserTypes } from '../Redux/CurrentUserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getPosts, selectPost } from './PostsSagas'
import { getComments, postComment } from './CommentsSagas'
import { getPseudonym, getUsers, toggleFollowUser } from './CurrentUserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const { baseUrl } = AppConfig;
const api = Discuss.create(baseUrl);
const fixture = FixtureAPI

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    //fix: this probably doesn't need to be a saga
    takeLatest(PostsTypes.SELECT_POST_REQUEST, selectPost),

    // some sagas receive extra parameters in addition to an action
    takeLatest(CurrentUserTypes.GET_PSEUDONYM_REQUEST, getPseudonym, fixture),
    takeLatest(PostsTypes.GET_POSTS_REQUEST, getPosts, api),
    takeLatest(CommentsTypes.GET_COMMENTS_REQUEST, getComments, fixture),
    takeLatest(CommentsTypes.POST_COMMENT_REQUEST, postComment, fixture),
    takeLatest(CurrentUserTypes.GET_USERS_REQUEST, getUsers, api),
    takeLatest(CurrentUserTypes.TOGGLE_FOLLOW_USER_REQUEST, toggleFollowUser, api),
  ])
}
