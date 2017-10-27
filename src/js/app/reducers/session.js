// import vendors
import * as u from 'updeep';
import { browserHistory } from 'react-router';
import i18next from 'i18next-client';

// import classes
import RoutesData from '../models/routes_data';


// ------------------------------------
// Constants
// ------------------------------------
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAIL = 'SESSION_LOGIN_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function loginSuccess(value) {
  return {
    type: SESSION_LOGIN_SUCCESS,
    payload: value
  };
}

export function loginFail(value) {
  return {
    type: SESSION_LOGIN_FAIL,
    payload: value
  };
}

export const loginAsync = (loginObj) => {
  return async(dispatch, getState) => {
    let loginToken = await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    }).then(() => {
      if (loginObj.login === 'anagram' && loginObj.password === 'anagram.paris') {
        return 'www.anagram.paris';
      } else {
        return 'invalid';
      }
    });

    if (loginToken !== 'invalid') {
      const obj = {
        token: loginToken,
        user: loginObj.login
      };
      const redirect = RoutesData.getInstance().getRoute('todos');
      dispatch(loginSuccess(obj));
      browserHistory.push(redirect);
    } else {
      let error = i18next.t('header.error_login');
      dispatch(loginFail(error));
    }
  };
}

// ------------------------------------
// Actions Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_LOGIN_SUCCESS]: (state, action) => {
    return u.update({
      loginToken: action.payload.token,
      username: action.payload.user,
      isNotLoggedIn: false,
      errorMsg: ''
    }, state);
  },

  [SESSION_LOGIN_FAIL]: (state, action) => {
    return u.update({
      errorMsg: action.payload
    }, state);
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isNotLoggedIn: true,
  loginToken: '',
  username: '',
  errorMsg: ''
};

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
