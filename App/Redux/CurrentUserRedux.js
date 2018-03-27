import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setPseudonymRequest: ['pseudonym'],
  setPseudonymSuccess: ['pseudonym'],
  setPseudonymFailure: null
})

export const CurrentUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  pseudonym: "Fixture User",
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CurrentUserSelectors = {
}

/* ------------- Reducers ------------- */

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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PSEUDONYM_REQUEST]: setPseudonymRequest,
  [Types.SET_PSEUDONYM_SUCCESS]: setPseudonymSuccess,
  [Types.SET_PSEUDONYM_FAILURE]: setPseudonymFailure
})
