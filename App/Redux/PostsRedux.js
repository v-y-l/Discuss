import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getPostsRequest: null,
  getPostsSuccess: ['payload'],
  getPostsFailure: null,
  selectPostRequest: ['postId'],
  selectPostSuccess: ['postId'],
  selectPostFailure: null,
  postCommentToPostRequest: ['postId', 'commentId'], //What you're sending to the server
  postCommentToPostSuccess: ['payload'], //What you're getting from the server
  postCommentToPostFailure: null,
})

export const PostsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  posts: null,
  postId: null,
  error: null
})

/* ------------- Selectors ------------- */

export const PostsSelectors = {
  getPosts: state => state.posts.posts
}

/* ------------- Reducers ------------- */

// ==========================================
// Reducers that add posts data to the store
// ==========================================

// request the data from an api
export const getPostsRequest = (state, action) =>
  state.merge({ fetching: true, posts: null, postId: null, error: null })

// successful api lookup
export const getPostsSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, posts: payload.posts, postId: null, error: null })
}

// Something went wrong somewhere.
export const getPostsFailure = state =>
  state.merge({ fetching: null, posts: null, postId: null, error: true })

// ==================================================================================
// Reducers that select the post whose comments will be viewed in the comments screen
// ==================================================================================

export const selectPostRequest = (state, action) => state

// successful api lookup
export const selectPostSuccess = (state, action) => {
  const { postId } = action
  return state.merge({ postId: postId })
}

// Something went wrong somewhere.
export const selectPostFailure = state =>
  state.merge({ postId: null, error: true })

// ==========================================
// Reducers that add a comment to the post
// ==========================================

// request the data from an api
export const postCommentToPostRequest = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const postCommentToPostSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, posts: payload.posts, error: null })
}

// Something went wrong somewhere.
export const postCommentToPostFailure = state =>
  state.merge({ fetching: null, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POSTS_REQUEST]: getPostsRequest,
  [Types.GET_POSTS_SUCCESS]: getPostsSuccess,
  [Types.GET_POSTS_FAILURE]: getPostsFailure,  
  [Types.SELECT_POST_REQUEST]: selectPostRequest,
  [Types.SELECT_POST_SUCCESS]: selectPostSuccess,
  [Types.SELECT_POST_FAILURE]: selectPostFailure,  
  [Types.POST_COMMENT_TO_POST_REQUEST]: postCommentToPostRequest,
  [Types.POST_COMMENT_TO_POST_SUCCESS]: postCommentToPostSuccess,
  [Types.POST_COMMENT_TO_POST_FAILURE]: postCommentToPostFailure,
})
