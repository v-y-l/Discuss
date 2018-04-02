import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetComments: null,
  getCommentsRequest: ['postId'],
  getCommentsSuccess: ['payload'],
  getCommentsFailure: null,
  postCommentRequest: ['postId', 'commentText', 'commentAuthor'],
  postCommentSuccess: null,
  postCommentFailure: null,
})

export const CommentsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
  offset: 0,
  limit: 10,
  fetching: null,
  posting: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CommentsSelectors = {
  getOffset: state => state.comments.offset,
  getLimit: state => state.comments.limit,
  getNumComments: state => state.comments.list.length
}

/* ------------- Reducers ------------- */

export const resetComments = (state, action) => {
  return state.merge({ list: [], offset: 0 })
}

// request the data from an api
export const getCommentsRequest = (state, action) => {
  return state.merge({ fetching: true })
}

// successful api lookup
export const getCommentsSuccess = (state, action) => {
  const { payload } = action
  return state.merge({
    fetching: false, 
    error: null,
    list: state.list.concat(payload.list),
    offset: payload.nextOffset,
  })
}

// Something went wrong somewhere.
export const getCommentsFailure = state =>
  state.merge({ 
    fetching: false, 
    error: true, 
    list: null 
  })

// request the data from an api
export const postCommentRequest = (state, action) => {
  return state.merge({ posting: true })
}

// successful api lookup
export const postCommentSuccess = (state, action) => {
  return state.merge({ 
    posting: false 
  })
}

// Something went wrong somewhere.
export const postCommentFailure = state =>
  state.merge({ 
    posting: false, 
    error: true, 
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_COMMENTS]: resetComments,
  [Types.GET_COMMENTS_REQUEST]: getCommentsRequest,
  [Types.GET_COMMENTS_SUCCESS]: getCommentsSuccess,
  [Types.GET_COMMENTS_FAILURE]: getCommentsFailure,
  [Types.POST_COMMENT_REQUEST]: postCommentRequest,
  [Types.POST_COMMENT_SUCCESS]: postCommentSuccess,
  [Types.POST_COMMENT_FAILURE]: postCommentFailure,
})
