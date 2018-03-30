import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setPseudonymRequest: ['pseudonym'],
  setPseudonymSuccess: ['pseudonym'],
  setPseudonymFailure: null,
  getUsersRequest: ['userId','offset','limit'],
  getUsersSuccess: ['payload'],
  getUsersFailure: null,
  toggleFollowUserRequest: ['userId', 'toggleUserId'],
  toggleFollowUserSuccess: ['payload'],
  toggleFollowUserFailure: null,
})

export const CurrentUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  pseudonym: "Fixture User",
  fetching: null,
  users: null,
  error: null,
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

// Reducers for getting information about who you are and aren't following

// request the data from an api
export const getUsersRequest = (state, action) =>
  state.merge({ fetching: true })

// successful api lookup
export const getUsersSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, users: payload })
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
  // todo: update the single user - https://github.com/rtfeldman/seamless-immutable: replace
  return state.merge({ fetching: false, error: null, users: payload })
}

// Something went wrong somewhere.
export const toggleFollowUserFailure = state =>
  state.merge({ fetching: false, error: true, users: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PSEUDONYM_REQUEST]: setPseudonymRequest,
  [Types.SET_PSEUDONYM_SUCCESS]: setPseudonymSuccess,
  [Types.SET_PSEUDONYM_FAILURE]: setPseudonymFailure,
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
  [Types.TOGGLE_FOLLOW_USER_REQUEST]: toggleFollowUserRequest,
  [Types.TOGGLE_FOLLOW_USER_SUCCESS]: toggleFollowUserSuccess,
  [Types.TOGGLE_FOLLOW_USER_FAILURE]: toggleFollowUserFailure,
})
