import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  userID: authData.localId,
  token: authData.idToken
  // email: authData.email,
  // refreshToken: authData.refreshToken,
  // displayName: authData.displayName
});

export const authFailure = error => ({
  type: actionTypes.AUTH_FAILURE,
  error: error
});

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = '/signupNewUser?key=AIzaSyDRnrs9D5_1z4LErbHuvxSw6PtZCk3MeMM';
    if (!isSignUp) {
      url = '/verifyPassword?key=AIzaSyDRnrs9D5_1z4LErbHuvxSw6PtZCk3MeMM';
    }
    axios.post(url, authData)
      .then(r => {
        dispatch(authSuccess(r.data));
      })
      .catch(e => {
        dispatch(authFailure(e.response.data.error));
      });
  };
};
