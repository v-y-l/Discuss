import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { PostsTypes } from '../Redux/PostsRedux'
import { CommentsTypes } from '../Redux/CommentsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getPosts, selectPost, postCommentToPost } from './PostsSagas'
import { getComments, postComment } from './CommentsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()
const fixture = FixtureAPI

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(PostsTypes.SELECT_POST_REQUEST, selectPost),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(PostsTypes.GET_POSTS_REQUEST, getPosts, fixture),
	takeLatest(PostsTypes.POST_COMMENT_TO_POST_REQUEST, postCommentToPost, fixture),
    takeLatest(CommentsTypes.GET_COMMENTS_REQUEST, getComments, fixture),
    takeLatest(CommentsTypes.POST_COMMENT_REQUEST, postComment, fixture),
  ])
}
