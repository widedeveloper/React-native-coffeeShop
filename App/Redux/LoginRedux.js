import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['email'],
  loginFailure: ['error', 'message'],
  userInfoRequest: null,
  forgotPasswordRequest: ['data'],
  success_forgotpassword: ['email'],
  success_userinfo: ['userinfo'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  password: null,
  error: "error",
  fetching: false,
  loggedIn: false,
  userinfo: '',
  message: ''
})

/* ------------- Reducers ------------- */

// we're attempting to login
//export const request = (state) => state.merge({ fetching: true });
export const request = (state) => state.merge({ fetching: true })
export const user_request = (state) => state.merge({ fetching: true })
export const forgotpassword_request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, { email }) =>
  state.merge({ fetching: false, error: null, email: email, loggedIn: true })

export const success_userinfo = (state, { userinfo }) =>
state.merge({ fetching: false, error: null, userinfo: userinfo })

export const success_forgotpassword = (state, { email }) =>
state.merge({ fetching: false, error: null, message: email })

// we've had a problem logging in
export const failure = (state, { error, message }) =>
   state.merge({ fetching: false, error, message })

// we've logged out
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.USERINFO_REQUEST]: user_request,
  [Types.SUCCESS_USERINFO]: success_userinfo,
  [Types.FORGOT_PASSWORD_REQUEST]: forgotpassword_request,
  [Types.SUCCESS_FORGOTPASSWORD]: success_forgotpassword,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.email !== null
