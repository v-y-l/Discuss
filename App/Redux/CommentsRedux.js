import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getCommentsRequest: null,
  getCommentsSuccess: ['payload'],
  getCommentsFailure: null,
  postCommentRequest: ['commentText', 'commentAuthor', 'postId'],
  postCommentSuccess: ['payload'],
  postCommentFailure: null,
})

export const CommentsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
  byId: {},
  offset: 0,
  limit: 10,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CommentsSelectors = {
  getOffset: state => state.comments.offset,
  getLimit: state => state.comments.limit,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ 
    fetching: false, 
    error: null,
    list: state.list.concat(payload.list),
    byId: state.byId.merge(payload.byId),
    offset: payload.nextOffset,
  })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, comments: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COMMENTS_REQUEST]: request,
  [Types.GET_COMMENTS_SUCCESS]: success,
  [Types.GET_COMMENTS_FAILURE]: failure,
  [Types.POST_COMMENT_REQUEST]: request,
  [Types.POST_COMMENT_SUCCESS]: success,
  [Types.POST_COMMENT_FAILURE]: failure,
})
