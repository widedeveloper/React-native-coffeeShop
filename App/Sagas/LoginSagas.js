import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { ACTION_SLIDE_OPEN } from '../Redux/NavigationRedux';
import { EMPTY_EMAIL, EMPTY_PASSWORD, ERROR_LOGIN } from '../Constants/constants.js'

// attempts to login
export function * login (api, data) {
  data = data.data
  if (data.email === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure(EMPTY_EMAIL))
  } else if (data.password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure(EMPTY_PASSWORD))
  } else {
    // dispatch successful logins
    const response = yield call(api.login, data.email, data.password)
    if (response.status) {
      const {user} = response;
      // do data conversion here if needed
      yield put(LoginActions.loginSuccess(user))
      yield put({type:ACTION_SLIDE_OPEN})
    } else {
      yield put(LoginActions.loginFailure(ERROR_LOGIN, response.message))
    }
  }
}

export function * getUserInfo (api) {
  const response = yield call(api.getUserInfo)
  if (response.status) {
    const {userinfo} = response;
    // do data conversion here if needed
    yield put(LoginActions.success_userinfo(userinfo))
  } else {
    
  }
}

export function * forgotPassword (api, data) {
  data = data.data
  if (data.email === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure(EMPTY_EMAIL))
  } else {
    // dispatch successful logins
    const response = yield call(api.forgotPassword, data.email)
    if (response.status) {
      const {email} = response;
      // do data conversion here if needed
      yield put(LoginActions.success_forgotpassword(email))
    } else {
      yield put(LoginActions.loginFailure(ERROR_LOGIN, response.message))
    }
  }
}

export function * logout (api) {
  yield call(api.logout)
}
