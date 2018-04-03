import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setSearchText: ['searchText'],
  resetUsers: null,
  getPseudonymRequest: ['postId'],
  getPseudonymSuccess: ['postId', 'pseudonym'],
  getPseudonymFailure: null,
  getUsersRequest: null,
  getUsersSuccess: ['payload'],
  getUsersFailure: null,
  toggleFollowUserRequest: ['toggleUserId'],
  toggleFollowUserSuccess: ['payload'],
  toggleFollowUserFailure: null,
})

export const CurrentUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  pseudonymList: {}, //fix: actually a dict
  fetching: null,
  users: [],
  searchText: '',
  offset: 0,
  limit: 10,
  error: null,
})

/* ------------- Selectors ------------- */

export const CurrentUserSelectors = {
  getOffset: state => state.currentUser.offset,
  getLimit: state => state.currentUser.limit,
  getSearchText: state => state.currentUser.searchText,
  getPseudonym: state => state.currentUser.pseudonymList[state.posts.postId]
}

/* ------------- Reducers ------------- */

export const resetUsers = (state, action) => {
  return state.merge({users:[], offset: 0})
}

export const setSearchText = (state, { searchText }) => state.merge({searchText})

// Methods for setting your pseudonym

// request the data from an api
export const getPseudonymRequest = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const getPseudonymSuccess = (state, { postId, pseudonym }) => {
  let pseudonymList = state.pseudonymList.merge({[postId]: pseudonym})
  return state.merge({ 
    fetching: false, 
    error: null, 
    pseudonymList
  })
}

// Something went wrong somewhere.
export const getPseudonymFailure = state =>
  state.merge({ fetching: false, error: true, pseudonym: null })

// Reducers for getting information about who you are and aren't following

// request the data from an api
export const getUsersRequest = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const getUsersSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ 
    fetching: false, 
    error: null, 
    users: state.users.concat(payload.list),
    offset: payload.nextOffset
  })
}

// Something went wrong somewhere.
export const getUsersFailure = state =>
  state.merge({ fetching: false, error: true, users: null })

// Reducers for setting information about who you are and aren't following

// request the data from an api
export const toggleFollowUserRequest = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const toggleFollowUserSuccess = (state, action) => {
  const { payload } = action 
  let users = state.users.map((user) => {
    if (user.id == payload) {
      user = user.merge({following: !user.following})
    }
    return user
  })
  return state.merge({ fetching: false, error: null, users })
}

// Something went wrong somewhere.
export const toggleFollowUserFailure = state =>
  state.merge({ fetching: false, error: true, users: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SEARCH_TEXT]: setSearchText,
  [Types.RESET_USERS]: resetUsers,
  [Types.GET_PSEUDONYM_REQUEST]: getPseudonymRequest,
  [Types.GET_PSEUDONYM_SUCCESS]: getPseudonymSuccess,
  [Types.GET_PSEUDONYM_FAILURE]: getPseudonymFailure,
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
  [Types.TOGGLE_FOLLOW_USER_REQUEST]: toggleFollowUserRequest,
  [Types.TOGGLE_FOLLOW_USER_SUCCESS]: toggleFollowUserSuccess,
  [Types.TOGGLE_FOLLOW_USER_FAILURE]: toggleFollowUserFailure,
})
