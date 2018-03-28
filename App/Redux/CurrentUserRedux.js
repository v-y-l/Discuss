import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setPseudonymRequest: ['pseudonym'],
  setPseudonymSuccess: ['pseudonym'],
  setPseudonymFailure: null,
  getUsersFollowingRequest: null,
  getUsersFollowingSuccess: ['payload'],
  getUsersFollowingFailure: null,
  toggleUsersFollowingRequest: ['user'],
  toggleUsersFollowingSuccess: ['payload'],
  toggleUsersFollowingFailure: null,
})

export const CurrentUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  pseudonym: "Fixture User",
  fetching: null,
  usersFollowing: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CurrentUserSelectors = {
}

/* ------------- Reducers ------------- */

// Methods for setting your pseudonym

// request the data from an api
export const setPseudonymRequest = (state, { pseudonym }) =>
  state.merge({ fetching: true })

// successful api lookup
export const setPseudonymSuccess = (state, action) => {
  const { pseudonym } = action
  return state.merge({ fetching: false, error: null, pseudonym })
}

// Something went wrong somewhere.
export const setPseudonymFailure = state =>
  state.merge({ fetching: false, error: true, pseudonym: null })

// Methods for getting information about who you are and aren't following

// request the data from an api
export const getUsersFollowingRequest = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const getUsersFollowingSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, usersFollowing: payload })
}

// Something went wrong somewhere.
export const getUsersFollowingFailure = state =>
  state.merge({ fetching: false, error: true, usersFollowing: null })

// Methods for setting information about who you are and aren't following

// request the data from an api
export const toggleUsersFollowingRequest = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const toggleUsersFollowingSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, usersFollowing: payload })
}

// Something went wrong somewhere.
export const toggleUsersFollowingFailure = state =>
  state.merge({ fetching: false, error: true, usersFollowing: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PSEUDONYM_REQUEST]: setPseudonymRequest,
  [Types.SET_PSEUDONYM_SUCCESS]: setPseudonymSuccess,
  [Types.SET_PSEUDONYM_FAILURE]: setPseudonymFailure,
  [Types.GET_USERS_FOLLOWING_REQUEST]: getUsersFollowingRequest,
  [Types.GET_USERS_FOLLOWING_SUCCESS]: getUsersFollowingSuccess,
  [Types.GET_USERS_FOLLOWING_FAILURE]: getUsersFollowingFailure,
  [Types.TOGGLE_USERS_FOLLOWING_REQUEST]: toggleUsersFollowingRequest,
  [Types.TOGGLE_USERS_FOLLOWING_SUCCESS]: toggleUsersFollowingSuccess,
  [Types.TOGGLE_USERS_FOLLOWING_FAILURE]: toggleUsersFollowingFailure,
})
